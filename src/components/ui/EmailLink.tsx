import type { AnchorHTMLAttributes } from 'react'
import { useProtectedMailto, type MailtoOptions } from '@/hooks/useProtectedMailto'

type EmailLinkProps = MailtoOptions &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'>

/** Plain text link version of `useProtectedMailto`. */
export function EmailLink({ subject, body, children, ...rest }: EmailLinkProps) {
  const mailto = useProtectedMailto({ subject, body })
  return (
    <a {...rest} {...mailto}>
      {children}
    </a>
  )
}
