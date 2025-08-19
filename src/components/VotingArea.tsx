import { useState, useEffect } from "react";
import { RotateCcw, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Room } from "@/types";
import { FIBONACCI_SEQUENCE } from "@/lib/utils";

interface VotingAreaProps {
  room: Room;
  currentUser: string;
  onVote: (value: number) => void;
  onStartNewRound: () => void;
  onRevealVotes: () => void;
}

export function VotingArea({
  room,
  currentUser,
  onVote,
  onStartNewRound,
  onRevealVotes,
}: VotingAreaProps) {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  const currentUserData = room?.participants?.find(
    (p) => p.name === currentUser
  );
  const isOwner = currentUserData?.isOwner || false;
  const currentRound = room?.currentRound;
  const userVote = currentRound?.votes?.find(
    (v) => v.userId === currentUserData?.id
  );
  const allVoted =
    currentRound && room?.participants && currentRound.votes
      ? currentRound.votes.length === room.participants.length &&
        currentRound.votes.every((v) => v.value !== null)
      : false;

  useEffect(() => {
    if (userVote) {
      setSelectedValue(userVote.value);
    } else {
      setSelectedValue(null);
    }
  }, [userVote]);

  useEffect(() => {
    if (
      allVoted &&
      room?.settings?.autoReveal &&
      currentRound &&
      !currentRound.isRevealed
    ) {
      const timer = setTimeout(() => {
        onRevealVotes();
      }, room?.settings?.revealDelay || 3000);

      // Countdown visual
      let countdownValue = Math.ceil(
        (room?.settings?.revealDelay || 3000) / 1000
      );
      setCountdown(countdownValue);

      const countdownTimer = setInterval(() => {
        countdownValue -= 1;
        setCountdown(countdownValue);
        if (countdownValue <= 0) {
          clearInterval(countdownTimer);
          setCountdown(null);
        }
      }, 1000);

      return () => {
        clearTimeout(timer);
        clearInterval(countdownTimer);
        setCountdown(null);
      };
    }
  }, [
    allVoted,
    room?.settings?.autoReveal,
    room?.settings?.revealDelay,
    currentRound,
    onRevealVotes,
  ]);

  function handleVote(value: number) {
    if (!currentRound || currentRound.isRevealed) return;

    setSelectedValue(value);
    onVote(value);
  }

  function getVoteResults() {
    if (!currentRound || !currentRound.isRevealed) return null;

    const votes = currentRound.votes.filter((v) => v.value !== null);
    const average =
      votes.reduce((sum, vote) => sum + vote.value!, 0) / votes.length;
    const sortedVotes = [...votes].sort((a, b) => a.value! - b.value!);

    return {
      average: Math.round(average * 10) / 10,
      min: sortedVotes[0]?.value || 0,
      max: sortedVotes[sortedVotes.length - 1]?.value || 0,
      votes: votes,
    };
  }

  const results = getVoteResults();

  if (!currentRound) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="text-center mb-8">
          {isOwner ? (
            <>
              <h3 className="text-2xl font-semibold mb-2">
                Pronto para começar?
              </h3>
              <p className="text-gray-500">Inicie uma nova rodada de votação</p>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-semibold mb-2">
                Aguardando início da rodada
              </h3>
              <p className="text-gray-500">
                O dono da sala iniciará a votação em breve
              </p>
            </>
          )}
        </div>
        {isOwner && (
          <Button onClick={onStartNewRound} size="lg">
            Iniciar Votação
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Voting Status */}
      <div className="py-4 px-6 bg-[#FEECDC]">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-medium">
              {currentRound.isRevealed
                ? "Resultados da Votação"
                : "Votação em Andamento"}
            </h3>
            <p className="text-sm font-light">
              {currentRound?.votes?.filter((v) => v.value !== null).length || 0}{" "}
              de {room?.participants?.length || 0} votaram
            </p>
          </div>

          {countdown && (
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{countdown}</div>
              <div className="text-xs font-light">Revelando...</div>
            </div>
          )}

          <div className="flex space-x-2">
            {isOwner &&
              allVoted &&
              !currentRound.isRevealed &&
              !room?.settings?.autoReveal && (
                <Button
                  onClick={onRevealVotes}
                  variant="default"
                  className="w-full sm:w-auto"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Revelar
                </Button>
              )}
            {isOwner && (
              <Button
                onClick={onStartNewRound}
                variant="outline"
                className="w-full sm:w-auto"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Nova Rodada
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Results or Voting Cards */}
      <div className="flex-1 p-6">
        {currentRound.isRevealed && results ? (
          <div className="space-y-6">
            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-100 rounded-lg">
                <div className="text-2xl font-bold ">{results.min}</div>
                <div className="text-sm text-gray-600 font-light">Mínimo</div>
              </div>
              <div className="text-center p-4 bg-primary/20 rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {results.average}
                </div>
                <div className="text-sm text-primary font-light">Média</div>
              </div>
              <div className="text-center p-4 bg-gray-100 rounded-lg">
                <div className="text-2xl font-bold ">{results.max}</div>
                <div className="text-sm text-gray-600 font-light">Máximo</div>
              </div>
            </div>

            {/* Individual Votes */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {results.votes.map((vote) => {
                const participant = room?.participants?.find(
                  (p) => p.id === vote.userId
                );
                const isCurrentUser = participant?.name === currentUser;
                return (
                  <div
                    key={vote.userId}
                    className={`text-center p-4 border rounded-lg shadow-sm ${
                      isCurrentUser
                        ? "bg-primary/10 border-primary/20"
                        : "bg-white"
                    }`}
                  >
                    <div className="text-3xl font-bold text-primary mb-2">
                      {vote.value}
                    </div>
                    <div
                      className={`text-sm ${
                        isCurrentUser
                          ? "text-primary font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      {isCurrentUser
                        ? `${participant?.name} (você)`
                        : participant?.name}
                    </div>
                  </div>
                );
              }) || []}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Participant Status */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {room?.participants?.map((participant) => {
                const hasVoted =
                  currentRound?.votes?.some(
                    (v) => v.userId === participant.id && v.value !== null
                  ) || false;
                const isCurrentUser = participant.name === currentUser;
                return (
                  <div
                    key={participant.id}
                    className={`text-center p-4 border rounded-lg ${
                      isCurrentUser
                        ? "bg-primary/10 border-primary/20"
                        : "bg-white"
                    }`}
                  >
                    <div className="w-16 h-16 mx-auto mb-2 bg-primary/20 rounded-full flex items-center justify-center">
                      {hasVoted ? (
                        <EyeOff className="h-5 w-5 text-primary" />
                      ) : (
                        <div className="text-primary text-lg">?</div>
                      )}
                    </div>
                    <div
                      className={`text-sm font-medium ${
                        isCurrentUser ? "text-primary" : "text-gray-900"
                      }`}
                    >
                      {isCurrentUser
                        ? `${participant.name} (você)`
                        : participant.name}
                    </div>
                    <div
                      className={`text-xs font-light ${
                        hasVoted ? "text-primary" : "text-gray-500"
                      }`}
                    >
                      {hasVoted ? "Votou" : "Aguardando"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Voting Buttons */}
      {!currentRound.isRevealed && (
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex flex-wrap gap-2 justify-center">
            {FIBONACCI_SEQUENCE.map((value) => (
              <Button
                key={value}
                variant={selectedValue === value ? "default" : "outline"}
                size="lg"
                onClick={() => handleVote(value)}
                className="min-w-[60px] h-16 text-xl font-bold border-gray-200"
                disabled={!!userVote}
              >
                {value}
              </Button>
            ))}
          </div>
          {userVote && (
            <div className="text-center mt-4 text-sm text-gray-600 font-light">
              Você votou: <span className="font-bold">{userVote.value}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
