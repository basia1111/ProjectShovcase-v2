import React, { SetStateAction } from "react";

type ProjectStatusInputProps = {
  status: {
    label: string;
    color: string;
    value: string;
  };
  selectedRadio: string;
  setSelectedRadio: React.Dispatch<SetStateAction<string>>;
};
const ProjectStatusInput = ({ status, selectedRadio, setSelectedRadio }: ProjectStatusInputProps) => {
  return (
    <div key={status.label}>
      <label
        htmlFor={status.value}
        style={{
          backgroundColor: selectedRadio == status.value ? `${status.color}30` : `${status.color}10`,
          color: selectedRadio == status.value ? `${status.color}` : `${status.color}70`,
          border: `1px solid ${selectedRadio == status.value ? `${status.color}` : status.color}70`,
        }}
        className="block rounded-[30px] p-1 transition-all"
      >
        <p>{status.label}</p>
      </label>
      <input
        type="radio"
        id={status.value}
        value={status.value}
        name="status"
        hidden
        onChange={() => setSelectedRadio(status.value)}
      />
    </div>
  );
};

export default ProjectStatusInput;
