import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, email, metadata } = body

    // API integration point: Initialize Paystack payment
    const paystackResponse = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        email,
        metadata,
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/paystack-callback`,
      }),
    })

    const paystackData = await paystackResponse.json()

    if (paystackData.status) {
      // Store transaction reference in database
      // API integration point: POST /api/transactions/create
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/transactions/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference: paystackData.data.reference,
          amount: amount / 100, // Convert back from kobo
          email,
          status: "pending",
          paymentMethod: "paystack",
          metadata,
        }),
      })

      return NextResponse.json(paystackData)
    } else {
      return NextResponse.json({ error: "Payment initialization failed" }, { status: 400 })
    }
  } catch (error) {
    console.error("Paystack initialization error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
