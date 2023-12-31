const { widget } = figma;
const { Input, AutoLayout, useSyncedState, usePropertyMenu , Text} = widget;

function Notepad() {
  const [text, setText] = useSyncedState("text", "Hello\nWidgets")
  const [amIDone, setDone] = useSyncedState("done", "Completed")
  const [who, setWho] = useSyncedState("who", "Unknown")
  const doneOptions = [{ option: "done", label: "Completed" }, { option: "maybe", label: "In progress" }, { option: "not yet", label: "Incomplete" }]
  const whoOptions = [{option: "abby", label: "Abby"}, {option: "Bob", label: "Bob"}]
  usePropertyMenu(
    [
      {
        itemType: 'dropdown',
        propertyName: 'doneNess',
        tooltip: 'Done selector',
        selectedOption: amIDone,
        options: doneOptions,
      },
      {
        itemType: 'dropdown',
        propertyName: 'whoDidIt',
        tooltip: 'Who selector',
        selectedOption: who,
        options: whoOptions,
      },
    ],
    ({propertyName, propertyValue}) => {
      if (propertyName === "doneNess") {
        setDone(propertyValue)
      }
      if (propertyName === "whoDidIt") {
        setWho(propertyValue)
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
      <Text fontSize={12} width={70} horizontalAlignText={'center'}>
      {doneOptions.find(f => f.option === amIDone)?.label || "Error"}
      </Text>
    </AutoLayout>
    <AutoLayout
      verticalAlignItems={'center'}
      padding={10}
    >
      <Text fontSize={12} width={70/2} horizontalAlignText={'center'}>
      {whoOptions.find(f => f.option === who)?.label || "Error"}
      </Text>
    </AutoLayout>
    </AutoLayout>
  );
}
widget.register(Notepad);