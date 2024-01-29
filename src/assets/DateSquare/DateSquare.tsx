type Props = { day: string; date: number };

const DateSquare = ({ day, date }: Props) => {
  return (
    <div className="p-2 py-4lex flex-col w-[41px] h-[50px] rounded-[10px] border border-[#3d1df3] border-bold text-[#3d1df3] text-[5px] flex items-center justify-center  ">
      {day}
      <div className="font-bold text-[16px]">{`0${date}`}</div>
    </div>
  );
};

export default DateSquare;
