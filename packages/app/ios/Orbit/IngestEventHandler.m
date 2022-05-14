//
//  IngestEventHandler.m
//  Orbit
//
//  Created by Ozzie Kirkby on 2022-05-08.
//

#import <Foundation/Foundation.h>
#import "IngestEventHandler.h"
#import "ShortcutIngestIntent.h"
#import "IngestEventEmitter.h"

@implementation IngestEventHandler

- (void)handleShortcutIngest:(nonnull ShortcutIngestIntent *)intent completion:(nonnull void (^)(ShortcutIngestIntentResponse * _Nonnull))completion{
  ShortcutIngestIntent *ingestIntent = (ShortcutIngestIntent *) intent;
  NSString *data = [[NSString alloc] initWithData:ingestIntent.file.data encoding:NSUTF8StringEncoding];
  
  IngestEventEmitter *emitter = [[IngestEventEmitter alloc] init];
  ShortcutIngestIntentResponseCode code;
  if (emitter.hasListeners) {
    bool success = [emitter emitIngestEvent:data];
    
    if (success) {
      code = ShortcutIngestIntentResponseCodeSuccess;
    } else {
      code = ShortcutIngestIntentResponseCodeFailure;
    }
  } else {
    code = ShortcutIngestIntentResponseCodeContinueInApp;
  }
  completion([[ShortcutIngestIntentResponse alloc] initWithCode:code userActivity:nil]);
}

@end
