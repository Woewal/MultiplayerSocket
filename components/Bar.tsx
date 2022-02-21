interface BarProps {
  colorOuterClass?: string;
  colorInnerClass?: string;
  percentage: number;
}

const Bar: React.FC<BarProps> = (props: BarProps) => {
  return (
    <div
      className={
        (props.colorOuterClass ? props.colorOuterClass : "bg-purple-900") +
        " rounded-full p-1 mb-3 w-full"
      }
    >
      <div
        className={
          (props.colorInnerClass ? props.colorInnerClass : "bg-yellow-300") +
          " h-3 rounded-full p-1 transition-all w-full"
        }
        style={{ width: props.percentage + "%" }}
      ></div>
    </div>
  );
};

export default Bar;
