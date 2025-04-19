// routes/user/delete.ts
import { Request, Response, Router } from "express";
import { userControllerInstance } from "../../controllers/users";
import { authMiddleware, AuthRequest } from "../../middleware/auth";

const router = Router();

router.delete("/:id", (req: Request, res: Response) => {
  authMiddleware(req as AuthRequest, res, () => {
    const authReq = req as AuthRequest;

    (async () => {
      try {
        const userId = req.params.id;

        // Security check: Users can only delete their own accounts
        if (authReq.userId !== userId) {
          return res.status(403).json({
            success: false,
            message: "You don't have permission to delete this account",
          });
        }

        await userControllerInstance.deleteUser(userId);

        return res.status(200).json({
          success: true,
          message: "Account successfully deleted",
        });
      } catch (error) {
        if (error instanceof Error) {
          return res.status(400).json({
            success: false,
            message: error.message,
          });
        }
        return res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    })().catch((err) => {
      console.error("Unhandled error:", err);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    });
  });
});

export default router;
