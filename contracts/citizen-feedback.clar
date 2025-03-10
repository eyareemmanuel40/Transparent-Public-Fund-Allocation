;; Citizen Feedback Contract

(define-map feedback
  { id: uint }
  { citizen: principal, project-id: uint, rating: uint, comment: (string-ascii 256) }
)

(define-data-var feedback-counter uint u0)

(define-public (submit-feedback (project-id uint) (rating uint) (comment (string-ascii 256)))
  (let
    (
      (feedback-id (+ (var-get feedback-counter) u1))
    )
    (map-set feedback
      { id: feedback-id }
      { citizen: tx-sender, project-id: project-id, rating: rating, comment: comment }
    )
    (var-set feedback-counter feedback-id)
    (ok feedback-id)
  )
)

(define-read-only (get-feedback (id uint))
  (map-get? feedback { id: id })
)

