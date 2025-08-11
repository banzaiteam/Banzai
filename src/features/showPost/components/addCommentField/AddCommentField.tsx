import React, { type ComponentPropsWithoutRef, useState } from 'react'
import { Button } from '@shared/ui'
import s from './AddCommentField.module.scss'

type Props = {
  isFetching?: boolean
} & ComponentPropsWithoutRef<'input'>

export const AddCommentField = (props: Props) => {
  const { isFetching = false, ...rest } = props
  const [inputValue, setInputValue] = useState('')
  return (
    <div className={s.add_comment}>
      <div className={s.add_comment_wrapper} aria-label="Add a comment">
        <input
          id="comment-input"
          value={inputValue}
          onChange={e => {
            setInputValue(e.currentTarget.value)
          }}
          type="text"
          placeholder={'Add a Comment...'}
          disabled={isFetching}
          aria-required="true"
          {...rest}
        />

        <Button
          disabled={isFetching}
          variant={'text-button'}
          type={'button'}
          aria-label="Publish comment"
        >
          Publish
        </Button>
      </div>
    </div>
  )
}
