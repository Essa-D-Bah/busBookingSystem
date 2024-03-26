import { Box, Icon, Paper, Typography } from "@mui/material";
import React from "react";
import { DirectionsBus, BookOnline, ModeOfTravel } from "@mui/icons-material";
import { BarChart } from "@mui/x-charts";
import { useGetCompanyAnalyticsQuery } from "../../services/queries";
import { useSelector } from "react-redux";

export default function CompanyDasboard() {
  const user = useSelector((state) => state.auth.user);
  const { data, isLoading, error } = useGetCompanyAnalyticsQuery(user.userId);
  const uData = [data?.bus?.length, data?.trips?.length, data?.tickets?.length];
  const xLabels = ["Buses", "Trips", "Tickets"];

  const cancelledTikets = data?.tickets?.filter(
    (tic) => tic.status === "cancel"
  );
  console.log(cancelledTikets);
  console.log("Data", data);
  return (
    <Box padding={2}>
      <Paper
        sx={{
          borderRadius: 2,
          padding: "10px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Box width={"20%"} bgcolor={"lightgrey"} borderRadius={2} padding={2}>
          <Box display={"flex"} justifyContent={"space-between"} mb={2}>
            <Typography color={"primary"}>Total Buses</Typography>
            <Icon>
              <DirectionsBus color="primary" />
            </Icon>
          </Box>
          <Typography variant="h4" color={"secondary"}>
            {data?.bus?.length}
          </Typography>
          <Typography color={"green"}>
            12% increase in the last month
          </Typography>
        </Box>
        <Box width={"20%"} bgcolor={"lightgrey"} borderRadius={2} padding={2}>
          <Box display={"flex"} justifyContent={"space-between"} mb={2}>
            <Typography color={"primary"}>Total Trips</Typography>
            <Icon>
              <ModeOfTravel color="primary" />
            </Icon>
          </Box>
          <Typography variant="h4" color={"secondary"}>
            {data?.trips?.length}
          </Typography>
          <Typography color={"green"}>
            12% increase in the last month
          </Typography>
        </Box>
        <Box width={"20%"} bgcolor={"lightgrey"} borderRadius={2} padding={2}>
          <Box display={"flex"} justifyContent={"space-between"} mb={2}>
            <Typography color={"primary"}>Total Tickets</Typography>
            <Icon>
              <BookOnline color="primary" />
            </Icon>
          </Box>
          <Typography variant="h4" color={"secondary"}>
            {data?.tickets?.length}
          </Typography>
          <Typography color={"green"}>
            12% increase in the last month
          </Typography>
        </Box>
        <Box width={"20%"} bgcolor={"lightgrey"} borderRadius={2} padding={2}>
          <Box display={"flex"} justifyContent={"space-between"} mb={2}>
            <Typography color={"error"}>Canelled Tickets</Typography>
            <Icon>
              <BookOnline color="error" />
            </Icon>
          </Box>
          <Typography variant="h4" color={"secondary"}>
            {cancelledTikets?.length}
          </Typography>
          <Typography color={"green"}>
            12% increase in the last month
          </Typography>
        </Box>
      </Paper>
      <Paper sx={{ mt: 4 }}>
        <Box>
          <BarChart
            width={800}
            height={500}
            series={[{ data: uData, label: "Graph", id: "pv" }]}
            xAxis={[{ data: xLabels, scaleType: "band" }]}
          />
        </Box>
      </Paper>
    </Box>
  );
}
