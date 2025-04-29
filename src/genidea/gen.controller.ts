import { Request, Response, NextFunction } from "express";
import { GenService } from "./gen.services";

export class GenController {
  private genService = new GenService();

  public async generate(req: Request, res: Response, next: NextFunction) {
    try {
      const { category, creatorProfile, timeSpan } = req.body;

      const payload = {
        category,
        creatorProfile,
        timeSpan,
      };

      const results = await this.genService.generateBuildIdea(payload);

      // pass to gemini API to collect results

      return res.status(200).json({
        success: true,
        message: `Successfully generated AI product idea`,
        data: results,
      });
    } catch (error) {
      next(error);
    }
  }
}
