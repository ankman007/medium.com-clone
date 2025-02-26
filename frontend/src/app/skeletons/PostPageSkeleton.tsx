import { Skeleton, Box, Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";

const PostPageSkeleton = () => {
  return (
    <Box sx={{ width: "100%", maxWidth: 1200, margin: "auto", padding: 2 }}>
      <Grid container spacing={2}>
        {/* Left Side - Main Post List */}
        <Grid item xs={12} md={8}>
          {[1, 2, 3, 4].map((_, index) => (
            <Card key={index} sx={{ display: "flex", alignItems: "center", mb: 2, padding: 1 }}>
              <CardContent sx={{ flex: 1 }}>
                <Skeleton variant="text" width="80%" height={25} />
                <Skeleton variant="text" width="95%" height={18} />
              </CardContent>
              <CardMedia>
                <Skeleton variant="rectangular" width={120} height={90} />
              </CardMedia>
            </Card>
          ))}
        </Grid>

        {/* Right Side - Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Recommended Posts Section */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6">
              <Skeleton variant="text" width="60%" />
            </Typography>
            {[1, 2, 3].map((_, index) => (
              <Skeleton key={index} variant="text" width="90%" height={20} sx={{ mb: 1 }} />
            ))}
          </Box>

          {/* Tags Section */}
          <Box>
            <Typography variant="h6">
              <Skeleton variant="text" width="50%" />
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {[1, 2, 3, 4, 5].map((_, index) => (
                <Skeleton key={index} variant="rectangular" width={80} height={30} />
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PostPageSkeleton;
