import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import axios from "axios";
import { 
  BASE_FIB_URL, 
  BASE_ZDM_URL,
  getDepartures, 
  getAllStations, 
  MVGDepatureResponse, 
  MVGStationResponse 
} from "../mvg-api";

// Mock axios
vi.mock("axios");

describe("MVG API", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("getDepartures", () => {
    const stationId = "1000001";
    const mockDeparturesResponse: { data: MVGDepatureResponse[] } = {
      data: [
        {
          plannedDepartureTime: 1648406400,
          realtime: true,
          delayInMinutes: 0,
          realtimeDepartureTime: 1648406400,
          transportType: "SBAHN",
          label: "S1",
          divaId: "1",
          network: "MVV",
          trainType: "S",
          destination: "Munich Airport",
          cancelled: false,
          sev: false,
          platform: 1,
          platformChanged: false,
          messages: [],
          bannerHash: "123",
          occupancy: "HIGH",
          stopPointGlobalId: "123",
        },
      ],
    };

    it("should fetch departures from the MVG API", async () => {
      vi.mocked(axios.get).mockResolvedValueOnce(mockDeparturesResponse);

      const result = await getDepartures({ stationId });

      const expectedParams = new URLSearchParams({
        limit: "10",
        globalId: stationId,
      });
      expect(vi.mocked(axios.get)).toHaveBeenCalledWith(
        `${BASE_FIB_URL}/departures`,
        { params: expectedParams }
      );

      expect(result).toEqual(mockDeparturesResponse.data);
    });

    it("should throw an error when the API call fails", async () => {
      const errorMessage = "Network Error";
      vi.mocked(axios.get).mockRejectedValueOnce(new Error(errorMessage));

      await expect(getDepartures({ stationId })).rejects.toThrow();
    });
  });

  describe("getAllStations", () => {
    const mockStationsResponse: { data: MVGStationResponse[] } = {
      data: [
        {
          name: "Garching",
          place: "Garching (b München)",
          id: "de:09184:490",
          divaId: 490,
          abbreviation: "GR",
          tariffZones: "1|2",
          products: ["UBAHN", "BUS"],
          latitude: 48.249419,
          longitude: 11.652506,
        }
      ]
    };

    it("should fetch all stations from the MVG API", async () => {
      vi.mocked(axios.get).mockResolvedValueOnce(mockStationsResponse);

      const result = await getAllStations();

      expect(vi.mocked(axios.get)).toHaveBeenCalledWith(`${BASE_ZDM_URL}/stations`);
      expect(result).toEqual(mockStationsResponse.data);
    });

    it("should throw an error when the API call fails", async () => {
      const errorMessage = "Network Error";
      vi.mocked(axios.get).mockRejectedValueOnce(new Error(errorMessage));

      await expect(getAllStations()).rejects.toThrow();
    });
  });
});
