export const Routes = {
    home: '/',
    slideshow: (slideshowId: string) => `/${slideshowId}`,
    landingPage: (slideshowId: string) => `/landing-page/${slideshowId}`,
    createVideo: (slideshowId: string) => `/${slideshowId}/create-video`
}