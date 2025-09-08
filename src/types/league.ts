export interface League {
  leagueId: number;
  leagueName: string;
}

export interface Team {
  teamId: number;
  name: string;
  leagueId: number;
}
