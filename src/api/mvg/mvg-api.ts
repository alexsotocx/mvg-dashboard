import axios from "axios";

export interface MVGDepatureResponse {
  plannedDepartureTime: number;
  realtime: boolean;
  delayInMinutes: number;
  realtimeDepartureTime: number;
  transportType: "SBAHN" | "UBAHN" | "TRAM" | "BUS";
  label: string;
  divaId: string;
  network: string;
  trainType: string;
  destination: string;
  cancelled: boolean;
  sev: boolean;
  platform: number;
  platformChanged: boolean;
  messages: string[];
  bannerHash: string;
  occupancy: string;
  stopPointGlobalId: string;
}

export interface GetDeparturesParams {
  stationId: string;
  limit?: number;
}

export const BASE_FIB_URL = "https://www.mvg.de/api/bgw-pt/v3";

export async function getDepartures({
  stationId,
  limit,
}: GetDeparturesParams): Promise<MVGDepatureResponse[]> {
  try {
    const searchParams = new URLSearchParams({
      limit: limit ? limit.toString() : "10",
      globalId: stationId,
    });

    const response = await axios.get<MVGDepatureResponse[]>(
      `${BASE_FIB_URL}/departures`,
      {
        params: searchParams,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching MVG departures:", error);
    throw error;
  }
}
