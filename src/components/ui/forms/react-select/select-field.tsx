import { ErrorMessage } from "@hookform/error-message";
import { Control, Controller, UseControllerProps } from "react-hook-form";
import Select, { MenuPlacement, StylesConfig } from "react-select";
import { cn } from "@/utils";

// import { Option, MultiValueLabel, SingleValue } from "./custom-component";

// import CreatableSelect from "react-select/creatable";

interface InputProps extends UseControllerProps {
  label?: string;
  className?: string;
  options: any[];
  control: Control<any>;
  isMulti?: boolean;
  isDisabled?: boolean;
  closeMenuOnSelect?: boolean;
  isLoading?: boolean;
  placeholder?: string;
  menuPlacement?: MenuPlacement;
}

export default function ReactSelectField({
  name,
  className = "",
  label = "",
  isMulti = false,
  closeMenuOnSelect = true,
  isDisabled = false,
  isLoading = false,
  options,
  placeholder = "",
  control,
  menuPlacement = "auto",
  ...others
}: InputProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field,
        formState: { errors },
        // fieldState: { isTouched },
      }) => {
        const selectStyle: StylesConfig<any, any> = {
          // state: {isFocused, isDisabled, menuIsOpen}
          // control: (base, state) => {}
          control: (base: any) => ({
            ...base,
            backgroundColor: isDisabled
              ? "rgb(229 231 235 / 0.5)"
              : "hsl(var(--input-bg-color))",
            padding: "3px",
            minHeight: "20px",
            borderRadius: "6px",
            boxShadow: "none",
            outline: "none",
            cursor: "pointer",
            border: `1px solid ${errors[name] && errors[name]?.message ? "#ef4444" : "#6b7280"} `,
          }),
          option: (base: any, { isSelected }: { isSelected: boolean }) => {
            return {
              ...base,
              cursor: "pointer",
              color: isSelected && "hsl(var(--background))",
              backgroundColor: isSelected ? "#60a5fa" : "hsl(var(--input-bg-color))",
              fontSize: "15px",
            };
          },
          multiValueLabel: (styles: any) => {
            return {
              ...styles,
              color: "hsl(var(--foreground))",
              backgroundColor: "hsl(var(--react-select-multi-value-bg))",
            };
          },
          singleValue: (styles: any) => {
            return {
              ...styles,
              color: "hsl(var(--foreground))",
            };
          },
          menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
          menu: (base: any) => ({
            ...base,
            marginTop: 5,
            zIndex: 9991,
            // fontFamily: "sans-serif",
            // fontSize: "12px",
            // textTransform: "capitalize",
            // overflow: "hidden",
          }),
          placeholder: (base: any) => {
            return {
              ...base,
              // fontSize: "14px",
              fontWeight: "300",
              color: "#d1d5db",
            };
          },
        };

        return (
          <>
            {label && (
              <label htmlFor={name} className="input-label">
                {label}
              </label>
            )}
            <Select
              // name={name}
              options={options}
              styles={selectStyle}
              className={cn("react-select-container", className)}
              classNamePrefix="react-select"
              isClearable
              isMulti={isMulti}
              isDisabled={isDisabled}
              closeMenuOnSelect={closeMenuOnSelect}
              isLoading={isLoading}
              placeholder={placeholder}
              isSearchable
              menuPortalTarget={document.body}
              menuPosition="absolute"
              menuPlacement={menuPlacement}
              // components={{ Option, SingleValue, MultiValueLabel }}
              // menuIsOpen
              // menuShouldScrollIntoView={false}
              // menuShouldBlockScroll
              maxMenuHeight={450}
              // value={options?.find((c) => c?.value === value)}
              // onChange={(e) => onChange(e.map((c: any) => c?.value))} = [0, 3, 4,5]
              {...field}
              {...others}
            />
            <ErrorMessage
              errors={errors}
              name={name}
              render={({ message }) => (
                <p className="mt-1 text-sm text-red-500">{message}</p>
              )}
            />
          </>
        );
      }}
    />
  );
}

ReactSelectField.defaultProps = {};
