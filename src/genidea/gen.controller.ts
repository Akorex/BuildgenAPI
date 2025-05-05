import { Request, Response, NextFunction } from "express";
import { GenService } from "./gen.services";
import genRequest from "./gen.model";

export class GenController {
  private genService = new GenService();

  generate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { category, creatorProfile, timeSpan } = req.body;

      const payload = {
        category,
        creatorProfile,
        timeSpan,
      };

      const results = await this.genService.generateBuildIdea(payload);

      if (results) {
        genRequest.create({
          category,
          creatorProfile,
          timeSpan,
        });
      }

      // pass to gemini API to collect results

      res.status(200).json({
        success: true,
        message: `Successfully generated AI product idea`,
        data: results,
      });
    } catch (error) {
      next(error);
    }
  };
}
