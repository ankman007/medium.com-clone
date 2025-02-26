import { Skeleton, Box, Button, Grid } from "@mui/material";

const BlogPublishSkeleton = () => {
  return (
    <Box sx={{ width: "100%", maxWidth: 900, margin: "auto", padding: 2 }}>
      {/* Page Title */}
      <Skeleton variant="text" width="50%" height={40} sx={{ mb: 3 }} />

      {/* Blog Cover Image Upload */}
      <Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: 2, mb: 3 }} />

      {/* Blog Title Input */}
      <Skeleton variant="rectangular" width="100%" height={50} sx={{ mb: 3 }} />

      {/* Blog Content Editor */}
      <Skeleton variant="rectangular" width="100%" height={300} sx={{ mb: 3 }} />

      {/* Meta Information (Tags, Publish Button) */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Skeleton variant="rectangular" width="100%" height={50} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Skeleton variant="rectangular" width="100%" height={50} />
        </Grid>
      </Grid>

      {/* Publish Button */}
      <Button variant="contained" fullWidth disabled sx={{ mt: 3 }}>
        <Skeleton variant="rectangular" width="100%" height={50} />
      </Button>
    </Box>
  );
};

export default BlogPublishSkeleton;
