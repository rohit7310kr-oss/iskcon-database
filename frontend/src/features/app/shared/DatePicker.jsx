import { DatePickerInput } from "@mantine/dates";
import { MantineProvider } from "@mantine/core";

function DatePicker({ dateFilter = [], setDateFilter }) {
  return (
    <MantineProvider>
      <div style={{ padding: "20px", maxWidth: "300px" }}>
        <DatePickerInput
          label="Pick dates"
          placeholder="Select multiple dates"
          type="multiple" // This enables multiple date selection!
          value={dateFilter}
          onChange={setDateFilter}
          clearable
          dropdownType="popover" // Ensures it doesn't mess up your UI
        />
      </div>
    </MantineProvider>
  );
}

export default DatePicker;
