;; Budget Allocation Contract

(define-map budget-allocations
  { department: (string-ascii 64) }
  { amount: uint }
)

(define-data-var total-budget uint u0)

(define-public (allocate-budget (department (string-ascii 64)) (amount uint))
  (begin
    (map-set budget-allocations { department: department } { amount: amount })
    (var-set total-budget (+ (var-get total-budget) amount))
    (ok true)
  )
)

(define-read-only (get-allocation (department (string-ascii 64)))
  (default-to { amount: u0 } (map-get? budget-allocations { department: department }))
)

(define-read-only (get-total-budget)
  (var-get total-budget)
)

