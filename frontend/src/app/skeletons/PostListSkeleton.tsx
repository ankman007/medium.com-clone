import { Skeleton, Box, Avatar, Card, CardContent, CardMedia } from "@mui/material";

const PostListSkeleton = () => {
  return (
    <Box sx={{ width: "100%", maxWidth: 800, margin: "auto", padding: 2 }}>
      {/* User Info Skeleton */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 3 }}>
        <Skeleton variant="circular">
          <Avatar />
        </Skeleton>
        <Box>
          <Skeleton variant="text" width={150} height={25} />
          <Skeleton variant="text" width={200} height={20} />
        </Box>
      </Box>

      {/* Post List Skeleton */}
      {[1, 2, 3, 4].map((_, index) => (
        <Card key={index} sx={{ display: "flex", alignItems: "center", mb: 2, padding: 1 }}>
          <CardContent sx={{ flex: 1 }}>
            <Skeleton variant="text" width="70%" height={25} />
            <Skeleton variant="text" width="90%" height={18} />
          </CardContent>
          <CardMedia>
            <Skeleton variant="rectangular" width={100} height={80} />
          </CardMedia>
        </Card>
      ))}
    </Box>
  );
};

export default PostListSkeleton;
