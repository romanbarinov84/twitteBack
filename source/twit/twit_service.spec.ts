import { TwistService } from "./twit_service.js"

describe('TwitService',() => {
    const twitService = new TwistService();
     it('should create a twit', async() => {
         const twit = await twitService.createTwit({
            text:"Hello World"
         })
         expect(twit).toHaveProperty('id');
         expect(twit.text).toBe("Hello World");
    });
})