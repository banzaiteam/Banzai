import React from 'react'
import { Button } from '@shared/ui'
import s from './AddCommentField.module.scss'
import { TextField } from '@radix-ui/themes'

type Props = {
  isFetching?: boolean
} & Omit<TextField.RootProps, 'variant' | 'type'>

export const AddCommentField = (props: Props) => {
  const { isFetching = false, ...rest } = props
  return (
    <div className={s.add_comment}>
      <div className={s.add_comment_wrapper} aria-label="Add a comment">
        <TextField.Root
          id="comment-input"
          type="text"
          variant={'soft'}
          placeholder={'Add a Comment...'}
          disabled={isFetching}
          aria-required="true"
          className={s.text_field_root}
          autoComplete={'off'}
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
