import { AnalyticsConsentError } from '../types/errors'
import { ValidationError } from './validation/validation-error'

/**
 * Thrown when a load should be cancelled.
 */
export class AbortLoadError extends AnalyticsConsentError {
  constructor(public loadSegmentNormally: boolean) {
    super('AbortLoadError', '')
  }
}

export interface AbortLoadOptions {
  /**
   * Whether or not to load segment.
   * If true -- load segment normally (and disable consent requirement.) Wrapper is essentially a no-op
   */
  loadSegmentNormally: boolean
}

export class LoadContext {
  /**
   * Abort the load (this function will always throw)
   */
  abort(options: AbortLoadOptions): never {
    if (typeof options !== 'object') {
      throw new ValidationError('arg should be an object', options)
    }
    throw new AbortLoadError(options.loadSegmentNormally)
  }
}
