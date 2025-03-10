;; Expense Tracking Contract

(define-map expenses
  { id: uint }
  { department: (string-ascii 64), amount: uint, description: (string-ascii 256) }
)

(define-data-var expense-counter uint u0)

(define-public (record-expense (department (string-ascii 64)) (amount uint) (description (string-ascii 256)))
  (let
    (
      (expense-id (+ (var-get expense-counter) u1))
    )
    (map-set expenses
      { id: expense-id }
      { department: department, amount: amount, description: description }
    )
    (var-set expense-counter expense-id)
    (ok expense-id)
  )
)

(define-read-only (get-expense (id uint))
  (map-get? expenses { id: id })
)

