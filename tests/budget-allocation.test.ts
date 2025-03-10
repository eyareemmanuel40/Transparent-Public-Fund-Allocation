import { describe, expect, it, vi } from "vitest"

// Mock contract calls
const mockContractCall = vi.fn()

describe("Budget Allocation Contract", () => {
  it("should allocate budget and retrieve it correctly", async () => {
    // Mock allocate-budget calls
    mockContractCall.mockReturnValueOnce({ result: { value: true } }).mockReturnValueOnce({ result: { value: true } })
    
    const allocateEducation = await mockContractCall("allocate-budget", ["Education", 1000000])
    const allocateHealthcare = await mockContractCall("allocate-budget", ["Healthcare", 2000000])
    
    expect(allocateEducation.result.value).toBe(true)
    expect(allocateHealthcare.result.value).toBe(true)
    
    // Mock get-allocation calls
    mockContractCall
        .mockReturnValueOnce({ result: { value: { amount: 1000000 } } })
        .mockReturnValueOnce({ result: { value: { amount: 2000000 } } })
    
    const educationAllocation = await mockContractCall("get-allocation", ["Education"])
    const healthcareAllocation = await mockContractCall("get-allocation", ["Healthcare"])
    
    expect(educationAllocation.result.value).toEqual({ amount: 1000000 })
    expect(healthcareAllocation.result.value).toEqual({ amount: 2000000 })
    
    // Mock get-total-budget call
    mockContractCall.mockReturnValueOnce({ result: { value: 3000000 } })
    
    const totalBudget = await mockContractCall("get-total-budget", [])
    expect(totalBudget.result.value).toBe(3000000)
  })
})

