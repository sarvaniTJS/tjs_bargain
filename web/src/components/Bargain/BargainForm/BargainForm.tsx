import type { EditBargainById, UpdateBargainInput } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  Submit,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormBargain = NonNullable<EditBargainById['bargain']>

interface BargainFormProps {
  bargain?: EditBargainById['bargain']
  onSave: (data: UpdateBargainInput, id?: FormBargain['id']) => void
  error: RWGqlError
  loading: boolean
}

const BargainForm = (props: BargainFormProps) => {
  const onSubmit = (data: FormBargain) => {
    props.onSave(data, props?.bargain?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormBargain> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="product"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Product
        </Label>

        <TextField
          name="product"
          defaultValue={props.bargain?.product}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="product" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>

        <TextField
          name="description"
          defaultValue={props.bargain?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="active"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Active
        </Label>

        <CheckboxField
          name="active"
          defaultChecked={props.bargain?.active}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="active" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default BargainForm
