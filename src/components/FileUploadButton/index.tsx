import React, { Dispatch } from "react";
import CustomButton from "../CustomButton";

interface IFileUploadButtonProps {
  children: string;
  variant?: string;
  type?: string;
  width?: number;
  loading?: boolean;
  small?: boolean;
  icon?: string;
  onChange: Dispatch<any>;
}

function FileUploadButton(props: IFileUploadButtonProps): JSX.Element {
  const viewChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.currentTarget.files[0]);
  };

  return (
    <>
      <label htmlFor="upload-photo">
        <input
          style={{ display: "none" }}
          id="upload-photo"
          name="upload-photo"
          type="file"
          onChange={viewChanges}
        />

        <CustomButton
          onClick={null}
          loading={props.loading}
          type={props.type}
          small={props.small}
          icon={props.icon}
          variant={props.variant}
          width={props.width}
        >
          {props.children}
        </CustomButton>
      </label>
    </>
  );
}

export default FileUploadButton;
