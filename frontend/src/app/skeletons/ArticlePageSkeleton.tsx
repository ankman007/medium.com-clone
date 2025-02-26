import { Skeleton, Box, Avatar, Typography, Card, CardContent } from "@mui/material";

const ArticlePageSkeleton = () => {
  return (
    <Box sx={{ width: "100%", maxWidth: 900, margin: "auto", padding: 2 }}>
      {/* Article Title */}
      <Typography variant="h3">
        <Skeleton variant="text" width="80%" height={40} />
      </Typography>

      {/* Metadata (Author, Date) */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 2 }}>
        <Skeleton variant="circular">
          <Avatar />
        </Skeleton>
        <Box>
          <Skeleton variant="text" width={120} height={20} />
          <Skeleton variant="text" width={80} height={15} />
        </Box>
      </Box>

      {/* Featured Image */}
      <Skeleton variant="rectangular" width="100%" height={250} sx={{ borderRadius: 2, marginBottom: 3 }} />

      {/* Article Content */}
      <Box>
        {[1, 2, 3, 4, 5].map((_, index) => (
          <Skeleton key={index} variant="text" width="100%" height={20} sx={{ marginBottom: 1 }} />
        ))}
      </Box>

      {/* Comments Section */}
      <Typography variant="h5" sx={{ marginTop: 4, marginBottom: 2 }}>
        <Skeleton variant="text" width="30%" height={30} />
      </Typography>

      {[1, 2, 3].map((_, index) => (
        <Card key={index} sx={{ display: "flex", alignItems: "center", mb: 2, padding: 2 }}>
          <Skeleton variant="circular">
            <Avatar />
          </Skeleton>
          <CardContent sx={{ flex: 1, marginLeft: 2 }}>
            <Skeleton variant="text" width="50%" height={20} />
            <Skeleton variant="text" width="90%" height={18} />
            <Skeleton variant="text" width="80%" height={18} />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ArticlePageSkeleton;
