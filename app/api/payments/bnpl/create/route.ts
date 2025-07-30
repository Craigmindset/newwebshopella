import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, duration, customerInfo, cartItems, monthlyPayment } = body

    // Generate unique order ID
    const orderId = `BNPL_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // API integration point: Create BNPL order in database
    const bnplOrder = {
      orderId,
      customerId: customerInfo.email, // Use email as customer identifier for guests
      customerInfo,
      cartItems,
      totalAmount: amount,
      duration,
      monthlyPayment,
      status: "pending_approval",
      createdAt: new Date().toISOString(),
      paymentSchedule: generatePaymentSchedule(amount, duration, monthlyPayment),
    }

    // Store BNPL order in database
    // API integration point: POST /api/bnpl/orders/create
    const dbResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bnpl/orders/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bnplOrder),
    })

    if (dbResponse.ok) {
      // Send confirmation email to customer
      // API integration point: POST /api/emails/send-bnpl-confirmation
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/emails/send-bnpl-confirmation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: customerInfo.email,
          orderId,
          monthlyPayment,
          duration,
        }),
      })

      return NextResponse.json({
        success: true,
        orderId,
        message: "BNPL order created successfully",
      })
    } else {
      return NextResponse.json({ error: "Failed to create BNPL order" }, { status: 400 })
    }
  } catch (error) {
    console.error("BNPL creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function generatePaymentSchedule(totalAmount: number, duration: string, monthlyPayment: number) {
  const months = Number.parseInt(duration.replace("months", ""))
  const schedule = []
  const startDate = new Date()

  for (let i = 1; i <= months; i++) {
    const dueDate = new Date(startDate)
    dueDate.setMonth(dueDate.getMonth() + i)

    schedule.push({
      installmentNumber: i,
      amount: i === months ? totalAmount - monthlyPayment * (months - 1) : monthlyPayment, // Adjust last payment for rounding
      dueDate: dueDate.toISOString(),
      status: "pending",
    })
  }

  return schedule
}
