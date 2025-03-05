import { Control, Controller, FieldValues, Path } from "react-hook-form";
import classNames from 'classnames';
import './checkbox.component.scss';

interface CheckboxProps<T extends FieldValues>  {
  belongsTo: string;
  labelText: string;
  name: Path<T>;
  control: Control<T>;
}

const Checkbox = <T extends FieldValues>({
  belongsTo,
  labelText,
  name,
  control,
}: CheckboxProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: 'You must agree to continue' }}
      render={({ field }) => (
        <label
          className={
            classNames(`${belongsTo}__checkbox-label`, 'checkbox-label')
          }
        >
          <input
            className="checkbox"
            type='checkbox'
            checked={field.value}
            onChange={(e) => field.onChange(e.target.checked)}
            ref={field.ref}
          />
          
          {labelText}
        </label>
      )}
    />
  );
}

export default Checkbox;
