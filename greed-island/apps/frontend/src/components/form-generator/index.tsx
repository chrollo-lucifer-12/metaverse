import {Control, Controller, FieldErrors, FieldValues, UseFormRegister} from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ErrorMessage } from "@hookform/error-message";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

interface FormGeneratorProps {
    type?: "text" | "email" | "password" | "number" | "file" | "checkbox";
    inputType: "select" | "input" | "textarea";
    options?: any[]
    label?: string;
    placeholder?: string;
    register: UseFormRegister<any>;
    name: string;
    errors: FieldErrors<FieldValues>;
    lines?: number;
    control?: Control<any>; // Add this line
}

const FormGenerator = ({
                           errors,
                           inputType,
                           label,
                           lines,
                           name,
                           options,
                           placeholder,
                           register,
                           type,
    control
                       }: FormGeneratorProps) => {
    switch (inputType) {
        case "input":
            // Checkbox input with improved styling
            if (type === "checkbox") {
                return (
                    <div className="mt-2 text-white flex items-center space-x-2">
                        <Input
                            id={name}
                            type="checkbox"
                            className="
                                h-4
                                w-4
                                rounded
                                border-gray-600
                                bg-gray-800
                                text-blue-500
                                focus:ring-blue-600
                                cursor-pointer
                            "
                            {...register(name)}
                        />
                        <Label
                            htmlFor={name}
                            className="
                                text-gray-300
                                hover:text-white
                                cursor-pointer
                                select-none
                                flex items-center
                                space-x-2
                            "
                        >
                            {label}
                        </Label>
                        <ErrorMessage
                            name={name}
                            errors={errors}
                            render={({message}) => (
                                <p className="text-red-600 text-sm ml-2">{message}</p>
                            )}
                        />
                    </div>
                );
            }

            return (
                <div className="mt-2 text-white flex flex-col">
                    <Label htmlFor={name} className="block mb-1">
                        {label}
                    </Label>
                    <Input
                        id={name}
                        className="
                            border
                            border-[#232325]
                            bg-black/50
                            text-white
                            placeholder-gray-500
                            focus:ring-2
                            focus:ring-blue-500
                        "
                        type={type}
                        placeholder={placeholder}
                        {...register(name, type === "file" ? {required: true} : {})}
                        style={{borderRadius: "0.4rem"}}
                        onChange={(e) => {
                            if (type === "file") {
                                const files = (e.target as HTMLInputElement).files;
                                if (files) {
                                    register(name).onChange({
                                        target: {name, value: files},
                                    });
                                }
                            }
                        }}
                    />
                    <ErrorMessage
                        name={name}
                        errors={errors}
                        render={({message}) => (
                            <p className="text-red-600 text-sm mt-1">{message}</p>
                        )}
                    />
                </div>
            );
        case "select":
            return (
                <div className="mt-2 text-white flex flex-col">
                    <Label htmlFor={name} className="block mb-1">
                        {label}
                    </Label>
                    <Controller
                        name={name}
                        control={control}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <SelectTrigger
                                    className="w-full border-[#232325] bg-black/50 text-white focus:ring-2 focus:ring-blue-500"
                                    style={{ borderRadius: "0.4rem" }}
                                >
                                    <SelectValue placeholder={placeholder || "Select a map"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {options?.map((option) => (
                                        <SelectItem key={option.id} value={option.id}>
                                            {option.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    <ErrorMessage
                        name={name}
                        errors={errors}
                        render={({ message }) => (
                            <p className="text-red-600 text-sm mt-1">{message}</p>
                        )}
                    />
                </div>
            );

        default:
            return null;
    }
};

export default FormGenerator;