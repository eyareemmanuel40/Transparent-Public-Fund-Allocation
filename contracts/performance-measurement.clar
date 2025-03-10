;; Performance Measurement Contract

(define-map project-performances
  { project-id: uint }
  { goal: (string-ascii 256), achieved: bool }
)

(define-public (set-project-performance (project-id uint) (goal (string-ascii 256)) (achieved bool))
  (ok (map-set project-performances
    { project-id: project-id }
    { goal: goal, achieved: achieved }
  ))
)

(define-read-only (get-project-performance (project-id uint))
  (map-get? project-performances { project-id: project-id })
)

