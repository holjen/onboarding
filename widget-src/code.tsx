const { widget } = figma;
const { Input, AutoLayout, useSyncedState, usePropertyMenu , Text} = widget;

function Notepad() {
  const [text, setText] = useSyncedState("text", "Hello\nWidgets")
  const [amIDone, setDone] = useSyncedState("done", "Completed")
  const [fruit, setFruit] = useSyncedState("fruit", "mango")
  //const doneOptions = [{option: "mango", label: "Mango"}, { option: "done", label: "Completed" }, { option: "maybe", label: "In progress" }, { option: "not yet", label: "Incomplete" }]
  const doneOptions = [{ option: "done", label: "Completed" }, { option: "maybe", label: "In progress" }, { option: "not yet", label: "Incomplete" }]
  usePropertyMenu(
    [
      {
        itemType: 'dropdown',
        propertyName: 'help',
        tooltip: 'Fruit selector',
        selectedOption: amIDone,
        options: doneOptions,
      },
    ],
    ({propertyName, propertyValue}) => {
      if (propertyName === "help") {
        setDone(propertyValue)
      }
    },
  )
  return (
    <AutoLayout
      verticalAlignItems="center"
      padding={{ left: 16, right: 8, top: 8, bottom: 8 }}
      fill="#FFFFFF"
      cornerRadius={8}
      spacing={12}
      stroke={{
        type: 'solid',
        color: '#123456',
      }}
      effect={{
        type: 'drop-shadow',
        color: { r: 0, g: 0, b: 0, a: 0.2 },
        offset: { x: 0, y: 0 },
        blur: 2,
        spread: 2,
      }}>
      <Input
        fill="#000"
        fontSize={15}
        height="hug-contents"
        horizontalAlignText="left"
        inputBehavior="multiline"
        inputFrameProps={{
          effect: {
            type: "drop-shadow",
            color: { r: 0, g: 0, b: 0, a: 0.2 },
            offset: { x: 0, y: 0 },
            blur: 2,
            spread: 2,
          },
          fill: "#FFFFFF",
          horizontalAlignItems: "center",
          padding: 8,
          verticalAlignItems: "center",
        }}
        onTextEditEnd={(e) => setText(e.characters)}
        value={text}
        width={250}
      />
    <AutoLayout
      verticalAlignItems={'center'}
      padding={10}
    >
      <Text fontSize={12} width={80} horizontalAlignText={'center'}>
      {doneOptions.find(f => f.option === amIDone)?.label || "Unknown"}
      </Text>
    </AutoLayout>
    </AutoLayout>
  );
}
widget.register(Notepad);