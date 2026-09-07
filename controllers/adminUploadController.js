// Images are returned as data URLs and stored with the product document. This
// keeps the admin upload self-contained and works on Render without a disk.
// The admin client compresses raster images before sending them here.
// ─── @desc    Prepare an image for product storage (admin only)
// ─── @route   POST /api/admin/upload
// ─── @access  Private/Admin
// Body: { image: "<base64 data URI>" }  →  { success, url }
export const uploadImage = async (req, res) => {
  const { image } = req.body || {};

  if (!image || typeof image !== "string") {
    return res.status(400).json({
      success: false,
      message: "No image provided. Send an image data URL.",
    });
  }

  if (!/^data:image\/(png|jpe?g|webp|gif|svg\+xml);base64,/i.test(image)) {
    return res.status(400).json({
      success: false,
      message: "Unsupported image format. Use PNG, JPG, WebP, GIF, or SVG.",
    });
  }

  if (image.length > 4 * 1024 * 1024) {
    return res.status(400).json({
      success: false,
      message: "Image data is too large. Choose a smaller image (max 3MB after compression).",
    });
  }

  return res.status(200).json({
    success: true,
    url: image,
  });
};