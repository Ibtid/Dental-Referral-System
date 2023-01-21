import { yupResolver } from "@hookform/resolvers/yup";
import { Fragment, PropsWithChildren } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Select, { SingleValue } from "react-select";
import { initialPageNo } from "../../consts/initialPageDetails";
import {
  ITableFilterFields,
  ITableFilterProps,
  IOption,
  IFormInput,
} from "../../interfaces/common";

const CommonFilter = <TFilterData extends object>({
  filterFields,
  filterValidationSchema,
  setFilterData,
  setPageNo,
}: PropsWithChildren<ITableFilterProps<TFilterData>>) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(filterValidationSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setFilterData(data as TFilterData);
    setPageNo(initialPageNo);
  };

  const handleReset = () => {
    reset();
    setFilterData({} as TFilterData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {filterFields.map((filterField: ITableFilterFields) => (
        <Fragment key={filterField.name}>
          <label>{filterField.label}</label>

          {filterField.type === "input" && (
            <Fragment>
              <input {...register(filterField.name)} />
              <p>{errors[`${filterField.name}`]?.message}</p>
            </Fragment>
          )}

          {filterField.type === "select" && (
            <Fragment>
              <Controller
                name={filterField.name}
                control={control}
                render={({ field: { name, onChange, ref, value } }) => (
                  <Select
                    ref={ref}
                    name={name}
                    value={
                      value
                        ? filterField.options?.find(
                            (option: IOption) => option.value === value
                          )
                        : null
                    }
                    options={filterField.options}
                    onChange={(selectedOption: SingleValue<IOption>) => {
                      onChange(selectedOption?.value);
                    }}
                  />
                )}
              />
              <p>{errors[`${filterField.name}`]?.message}</p>
            </Fragment>
          )}
        </Fragment>
      ))}

      <button type="button" onClick={handleReset}>
        reset
      </button>
      <button type="submit">filter</button>
    </form>
  );
};

export default CommonFilter;
