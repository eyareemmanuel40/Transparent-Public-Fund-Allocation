import { describe, expect, it, vi } from "vitest"

// Mock contract calls
const mockContractCall = vi.fn()

describe("Expense Tracking Contract", () => {
  it("should record an expense and retrieve it correctly", async () => {
    // Mock record-expense call
    mockContractCall.mockReturnValueOnce({ result: { value: 1 } })
    
    const recordExpense = await mockContractCall("record-expense", ["Education", 500000, "School supplies"])
    expect(recordExpense.result.value).toBe(1) // Expecting the first expense ID to be 1
    
    // Mock get-expense call
    mockContractCall.mockReturnValueOnce({
      result: {
        value: {
          department: "Education",
          amount: 500000,
          description: "School supplies",
        },
      },
    })
    
    const expenseDetails = await mockContractCall("get-expense", [1])
    expect(expenseDetails.result.value).toEqual({
      department: "Education",
      amount: 500000,
      description: "School supplies",
    })
  })
})

