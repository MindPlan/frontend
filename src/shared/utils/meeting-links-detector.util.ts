class MeetingLinksDetector {
  /**
   * @description Now the method checks if the link is google-meet link or zoom-meet link
   * @param {string} link - link in the description that may be meeting link
   * @return {boolean} - is it meeting link?
   *
   * @example
   * const validMeetingLink = 'https://meet.google.com/123123123';
   * const invalidMeetingLink = 'https://meetS.googlEe.com/123123123';
   * meetingLinksDetector.detect(validMeetingLink); // true
   * meetingLinksDetector.detect(invalidMeetingLink); // false
   * */
  public detect(link: string): boolean {
    const regexGoogleMeetings = /^(meet\.google\.com\/[a-z0-9-]+|g\.co\/meet\/[a-z0-9]+|apps\.google\.com\/meet\/?)/i;
    const regexZoomMeetings = /^(zoom\.us\/j\/\d+|us04web\.zoom\.us\/j\/\d+|us05web\.zoom\.us\/j\/\d+)/i;
    
    return regexGoogleMeetings.test(link) || regexZoomMeetings.test(link);
  }
}

export const meetingLinksDetector = new MeetingLinksDetector();
