import { FormEventHandler, ReactNode, useState, createContext, useContext } from 'react';
import { Control, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

// Field 옵션 context 생성
const FieldOptionContext = createContext<{
  orientation: 'horizontal' | 'vertical';
  insideModal: boolean;
}>({ orientation: 'horizontal', insideModal: false });

// FormSubmit에서 context로 옵션 제공

type FormSubmitProps = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  insideModal?: boolean;
};

export function FormSubmit({
  onSubmit,
  children,
  className,
  orientation = 'horizontal',
  insideModal = false,
}: FormSubmitProps) {
  return (
    <FieldOptionContext.Provider value={{ orientation, insideModal }}>
      <form onSubmit={onSubmit} className={cn('space-y-1', className)}>
        {children}
      </form>
    </FieldOptionContext.Provider>
  );
}

type FieldProps<T extends FieldValues> = {
  showLabel?: boolean;
  control: Control<T>;
  label?: string;
  name: Path<T>;
  desc?: string;
  orientation?: 'horizontal' | 'vertical';
  /* @deprecated: insideModal props 제거 */
  insideModal?: boolean;
  required?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: ({
    field,
    required,
  }: {
    field: ControllerRenderProps<T, any>;
    required: boolean;
  }) => React.ReactElement;
};

export function Field<T extends FieldValues>({
  showLabel = true,
  control,
  name,
  label,
  desc,
  orientation,
  insideModal,
  required = false,
  render,
}: FieldProps<T>) {
  // context에서 옵션 가져오기
  const ctx = useContext(FieldOptionContext);
  const _orientation = orientation ?? ctx.orientation;
  const _insideModal = insideModal ?? ctx.insideModal;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className={cn('space-y-0')}>
            <div
              className={cn({
                'flex flex-col justify-center': _orientation === 'vertical',
                'flex flex-row items-center': _orientation === 'horizontal',
              })}
            >
              {label && (
                /* FIXME: 폼 케이스 확인 - showLabel & _orientation & insideModal */
                <FormLabel
                  className={cn(
                    'text-tweb-neutral2 font-regular h-11 flex items-center',
                    !showLabel && 'sr-only',
                    _orientation === 'vertical' && ' my-2',
                    _orientation === 'horizontal' && 'flex-shrink-0 w-[136px]',
                    _insideModal && 'flex-shrink-0 w-[120px] h-12',
                  )}
                >
                  {label}
                  {required && <span className="ml-1">*</span>}
                </FormLabel>
              )}
              <FormControl>{render({ field, required })}</FormControl>
            </div>
            <FormMessage
              className={cn(
                showLabel && _orientation === 'horizontal' && 'pl-[136px]',
                showLabel && _insideModal && 'pl-[120px]',
                !_insideModal ? 'pt-1' : 'pt-0 pb-2',
              )}
            />
            {desc && (
              <FormDescription
                className={cn(
                  !showLabel && 'sr-only',
                  _orientation === 'horizontal' && 'pl-[136px]',
                )}
              >
                * {desc}
              </FormDescription>
            )}
          </FormItem>
        );
      }}
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FileUploadProps = {
  field: ControllerRenderProps<any, Path<any>>;
  button?: ReactNode;
  isPreview?: boolean;
};
export function FileUpload({ field, button = '업로드', isPreview }: FileUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(field.value);
  return (
    <div>
      {button || (
        <Button type="button" asChild className="block w-36 text-center">
          <label htmlFor="upload">{button}</label>
        </Button>
      )}
      <Input
        className="hidden"
        id="upload"
        type="file"
        {...field}
        value={undefined}
        onChange={(event) => {
          const selectedFile = event.target.files?.[0];
          if (!selectedFile) {
            return;
          }

          // 이미지 파일이면 미리보기 URL 생성
          if (selectedFile.type.startsWith('image/')) {
            setPreviewUrl(URL.createObjectURL(selectedFile));
          } else {
            setPreviewUrl('');
          }

          field.onChange(selectedFile ?? null);
        }}
      />
      {isPreview && previewUrl && (
        <>
          <div>{field.value.name ?? field.value}</div>
          <div className="mt-2">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-lg shadow"
            />
          </div>
        </>
      )}
    </div>
  );
}

export function ButtonWrapper({ children }: { children: ReactNode }) {
  return <div className="text-right space-x-5 pt-6">{children}</div>;
}
