import { act, renderHook } from "@testing-library/react-hooks";
import useDialog, { IDialog } from "./useDialog";

test("should have default values", () => {
  const { result } = renderHook(() => useDialog({ children: <span></span> }));
  expect(result.current.props.value.dialog.isOpen).toBeFalsy();
  expect(result.current.props.value.dialog.title).toEqual("Erro");
  expect(result.current.props.value.dialog.description).toEqual(
    "Oops, ocorreu algum erro desconhecido. Tente novamente."
  );
  expect(result.current.props.value.dialog.buttonText).toEqual("OK");
});

test("should show the default dialog", () => {
  const { result } = renderHook(() => useDialog({ children: <span></span> }));
  act(() => {
    result.current.props.value.showDialog();
  });

  expect(result.current.props.value.dialog.isOpen).toBeTruthy();
});

test("should show and close the default dialog", () => {
  const { result } = renderHook(() => useDialog({ children: <span></span> }));
  act(() => {
    result.current.props.value.showDialog();
  });

  expect(result.current.props.value.dialog.isOpen).toBeTruthy();

  act(() => {
    result.current.props.value.closeDialog();
  });

  expect(result.current.props.value.dialog.isOpen).toBeFalsy();
});

test("should create a new dialog and then close it", () => {
  const { result } = renderHook(() => useDialog({ children: <span></span> }));

  const newDialog: IDialog = {
    buttonText: "Pronto",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea error, deserunt optio non soluta maxime sint? Nulla mollitia repellendus reiciendis, aperiam eius reprehenderit laboriosam modi quod repudiandae nemo, non accusantium!",
    title: "Sit Amet Consectetur Adipisicing Elit",
    isOpen: true,
  };
  const { buttonText, description, title, isOpen } = newDialog;

  act(() => {
    result.current.props.value.newDialog(
      isOpen,
      title,
      description,
      buttonText
    );
  });

  expect(result.current.props.value.dialog.isOpen).toEqual(newDialog.isOpen);
  expect(result.current.props.value.dialog.title).toEqual(newDialog.title);
  expect(result.current.props.value.dialog.description).toEqual(
    newDialog.description
  );
  expect(result.current.props.value.dialog.buttonText).toEqual(
    newDialog.buttonText
  );

  act(() => {
    result.current.props.value.closeDialog();
  });

  expect(result.current.props.value.dialog.isOpen).toBeFalsy();
});
