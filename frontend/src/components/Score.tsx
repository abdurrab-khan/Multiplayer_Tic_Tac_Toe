import { useApp } from "@/context/AppProvider";

function Score() {
  const { user } = useApp();

  if (!user || user?.tic_tac_toe_high_score <= 0) return <></>;

  return (
    <div className="flex items-center gap-3">
      <p
        className={
          "select-none font-gameFont text-3xl font-bold tabular-nums text-customYellow transition-all duration-300 hover:text-customDarkYellow"
        }
      >
        {user?.tic_tac_toe_high_score}
      </p>
      <div className="h-10 w-10">
        <img
          src="/icons/score.svg"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

export default Score;
