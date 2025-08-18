'use client'
import React, { useRef } from 'react'
import { Button } from '@shared/ui'
import s from './AddCommentField.module.scss'
import { TextField } from '@radix-ui/themes'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type FormDataAddCommentField, schemaAddCommentFieldSchema } from '@/features'
import { useAddCommentMutation } from '@features/showPost/api/api'
import { clsx } from 'clsx'
import { useGetMeQuery } from '@shared/api/userApi'

type Props = {
  postId: string
} & Omit<TextField.RootProps, 'variant' | 'type'>

export const AddCommentField = (props: Props) => {
  const { className, postId, ...rest } = props
  const isSendPermissionRef = useRef(true)
  const { data } = useGetMeQuery()
  const [addComment /* { isLoading }*/] = useAddCommentMutation()
  const { register, handleSubmit, reset } = useForm<FormDataAddCommentField>({
    resolver: zodResolver(schemaAddCommentFieldSchema),
    defaultValues: {
      comment: '',
    },
  })
  /*const isDisabled = isLoading*/
  /*ssr meData не доступна, поэтому input и button при SSR загружаются на клиенте*/
  const isDisabled = !data
  const textFieldRootStyles = clsx(s.text_field_root, className, {
    [s.disabled]: isDisabled,
  })
  const addCommentStyles = clsx(s.add_comment, {
    [s.disabled]: isDisabled,
  })
  const onSubmitHandler: SubmitHandler<FormDataAddCommentField> = async ({ comment }) => {
    if (isSendPermissionRef.current) {
      isSendPermissionRef.current = false
      try {
        await addComment({ text: comment, postId }).unwrap()
      } catch (error) {
        console.error(error)
      } finally {
        isSendPermissionRef.current = true
        reset()
      }
    }
  }
  return (
    <div className={addCommentStyles}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className={s.add_comment_wrapper} aria-label="Add a comment">
          <TextField.Root
            id="comment-input"
            type="text"
            variant={'soft'}
            placeholder={'Add a Comment...'}
            disabled={isDisabled}
            aria-required="true"
            className={textFieldRootStyles}
            autoComplete={'off'}
            {...register('comment')}
            {...rest}
          />

          <Button
            disabled={isDisabled}
            variant={'text-button'}
            type={'submit'}
            aria-label="Publish comment"
          >
            Publish
          </Button>
        </div>
      </form>
    </div>
  )
}
