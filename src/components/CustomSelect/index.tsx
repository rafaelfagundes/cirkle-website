import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Colors from "../../enums/Colors";

export type SelectItem = {
  title: string;
  value: any;
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
    flex: 1,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  label: {
    fontFamily: "Commissioner",
    color: Colors.PRIMARY,
  },
}));

function CustomSelect({
  label,
  items,
  value,
  setValue,
}: {
  label?: string;
  items: Array<SelectItem>;
  value: any;
  setValue: (value: any) => void;
}): JSX.Element {
  const classes = useStyles();

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: any }>
  ) => {
    setValue(event.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      {label && <InputLabel className={classes.label}>{label}</InputLabel>}
      <Select value={value} onChange={handleChange}>
        {items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            <span className={classes.label}>{item.title}</span>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CustomSelect;
