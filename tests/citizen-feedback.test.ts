import { describe, expect, it, vi } from "vitest"

// Mock contract calls
const mockContractCall = vi.fn()

describe("Citizen Feedback Contract", () => {
  it("should submit feedback and retrieve it correctly", async () => {
    // Mock submit-feedback call
    mockContractCall.mockReturnValueOnce({ result: { value: 1 } })
    
    const submitFeedback = await mockContractCall("submit-feedback", [1, 4, "Great improvement in local schools"])
    expect(submitFeedback.result.value).toBe(1) // Expecting the first feedback ID to be 1
    
    // Mock get-feedback call
    mockContractCall.mockReturnValueOnce({
      result: {
        value: {
          citizen: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
          "project-id": 1,
          rating: 4,
          comment: "Great improvement in local schools",
        },
      },
    })
    
    const feedbackDetails = await mockContractCall("get-feedback", [1])
    expect(feedbackDetails.result.value).toEqual({
      citizen: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
      "project-id": 1,
      rating: 4,
      comment: "Great improvement in local schools",
    })
  })
})

