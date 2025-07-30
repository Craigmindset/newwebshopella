import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, provider, customerInfo, cartItems } = body

    // Generate unique application ID
    const applicationId = `LOAN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // API integration point: Create loan application
    const loanApplication = {
      applicationId,
      customerId: customerInfo.email,
      customerInfo,
      cartItems,
      loanAmount: amount,
      provider,
      status: "pending_review",
      createdAt: new Date().toISOString(),
    }

    // Store loan application in database
    // API integration point: POST /api/loans/applications/create
    const dbResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/loans/applications/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loanApplication),
    })

    if (dbResponse.ok) {
      // Integrate with loan provider API
      const providerResponse = await processLoanWithProvider(provider, loanApplication)

      if (providerResponse.success) {
        // Update application status
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/loans/applications/update`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            applicationId,
            status: "approved",
            providerResponse: providerResponse.data,
          }),
        })

        // Send approval email
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/emails/send-loan-approval`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: customerInfo.email,
            applicationId,
            loanAmount: amount,
            provider,
          }),
        })

        return NextResponse.json({
          success: true,
          applicationId,
          status: "approved",
          message: "Loan approved successfully",
        })
      } else {
        return NextResponse.json({
          success: false,
          applicationId,
          status: "rejected",
          message: "Loan application rejected",
          reason: providerResponse.reason,
        })
      }
    } else {
      return NextResponse.json({ error: "Failed to create loan application" }, { status: 400 })
    }
  } catch (error) {
    console.error("Wallet loan error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function processLoanWithProvider(provider: string, application: any) {
  // Mock loan provider integration
  // In real implementation, integrate with actual loan provider APIs

  const providers = {
    creditloan: {
      apiUrl: "https://api.creditloan.com/applications",
      apiKey: process.env.CREDITLOAN_API_KEY,
    },
    renmoney: {
      apiUrl: "https://api.renmoney.com/loan-applications",
      apiKey: process.env.RENMONEY_API_KEY,
    },
    fairloan: {
      apiUrl: "https://api.fairloan.com/apply",
      apiKey: process.env.FAIRLOAN_API_KEY,
    },
  }

  const providerConfig = providers[provider]
  if (!providerConfig) {
    return { success: false, reason: "Invalid loan provider" }
  }

  try {
    // Simulate loan provider API call
    // Replace with actual API integration
    const response = await fetch(providerConfig.apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${providerConfig.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerInfo: application.customerInfo,
        loanAmount: application.loanAmount,
        purpose: "ecommerce_purchase",
        applicationId: application.applicationId,
      }),
    })

    // Mock response for demo purposes
    // In real implementation, handle actual provider responses
    const mockApproval = Math.random() > 0.3 // 70% approval rate for demo

    if (mockApproval) {
      return {
        success: true,
        data: {
          providerLoanId: `${provider.toUpperCase()}_${Date.now()}`,
          approvedAmount: application.loanAmount,
          interestRate: getProviderInterestRate(provider),
          repaymentTerms: "30 days",
        },
      }
    } else {
      return {
        success: false,
        reason: "Insufficient credit score or income verification failed",
      }
    }
  } catch (error) {
    console.error(`${provider} API error:`, error)
    return { success: false, reason: "Provider API error" }
  }
}

function getProviderInterestRate(provider: string) {
  const rates = {
    creditloan: 12,
    renmoney: 15,
    fairloan: 10,
  }
  return rates[provider] || 15
}
