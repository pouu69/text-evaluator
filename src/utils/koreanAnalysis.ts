/**
 * 한국어 형태소 분석을 위한 유틸리티 클래스
 *
 * 확장된 어휘 데이터베이스와 개선된 알고리즘을 사용하여
 * 한국어 텍스트의 형태소 분석 정확도를 향상시킵니다.
 */

import koreanLexicon from "../data/koreanLexicon.json";

interface AnalysisOptions {
  /** 불용어 제거 여부 */
  removeStopwords?: boolean;
  /** 최소 단어 길이 */
  minLength?: number;
  /** 인터넷 용어 처리 여부 */
  handleInternetTerms?: boolean;
  /** 복합어 분해 여부 */
  decomposeCompounds?: boolean;
}

/**
 * 향상된 한국어 형태소 분석기 클래스
 */
export class KoreanMorphologicalAnalyzer {
  // 어휘 데이터
  private readonly JOSA: Set<string>;
  private readonly EOMI: Set<string>;
  private readonly SUFFIX: Set<string>;
  private readonly PREFIX: Set<string>;
  private readonly COMPOUNDS: Map<string, string[]>;
  private readonly INTERNET_TERMS: Set<string>;

  // 불용어 목록
  private readonly STOPWORDS: Set<string>;

  constructor() {
    // 어휘 데이터 로드
    this.JOSA = new Set(koreanLexicon.josa);
    this.EOMI = new Set(koreanLexicon.eomi);
    this.SUFFIX = new Set(koreanLexicon.suffixes);
    this.PREFIX = new Set(koreanLexicon.prefixes);
    this.COMPOUNDS = new Map(Object.entries(koreanLexicon.compounds));
    this.INTERNET_TERMS = new Set(koreanLexicon.internetTerms);

    // 불용어 목록 초기화
    this.STOPWORDS = new Set([
      "이",
      "그",
      "저",
      "것",
      "수",
      "등",
      "들",
      "및",
      "에",
      "에서",
      "의",
      "을",
      "를",
      "이",
      "가",
      "은",
      "는",
      "이다",
      "있다",
      "하다",
      "이런",
      "그런",
      "저런",
      "이렇게",
      "그렇게",
      "저렇게",
      "또한",
      "그리고",
      "하지만",
      "그러나",
      "그래서",
      "따라서",
      "그러므로",
      "그런데",
      "그리하여",
      "때문에",
      "위해",
      "위하여",
      "통해",
      "통하여",
      "으로",
      "로",
      "에게",
      "께",
      "와",
      "과",
      "이나",
      "거나",
      "또는",
      "혹은",
      "뿐",
      "만",
      "까지",
      "부터",
      "에서부터",
      "에게서",
      "로부터",
      "이라고",
      "라고",
      "이라는",
      "라는",
      "이라면",
      "라면",
      "이어서",
      "어서",
      "이어야",
      "어야",
      "이었다",
      "였다",
      "더라도",
      "이더라도",
      "하더라도",
      "든지",
      "이든지",
      "하든지",
      "이건",
      "그건",
      "저건",
    ]);
  }

  /**
   * 한국어 텍스트를 형태소 분석하여 토큰화
   * @param text 분석할 텍스트
   * @param options 분석 옵션
   * @returns 토큰화된 형태소 배열
   */
  public analyze(text: string, options: AnalysisOptions = {}): string[] {
    const {
      removeStopwords = true,
      minLength = 1,
      handleInternetTerms = true,
      decomposeCompounds = true,
    } = options;

    // 1. 문장 정규화 (공백, 특수문자 처리)
    const normalizedText = this.normalizeText(text);

    // 2. 공백 기준 토큰화
    const tokens = normalizedText.split(/\s+/);

    // 3. 인터넷 용어 처리
    let processedTokens = tokens;
    if (handleInternetTerms) {
      processedTokens = this.handleInternetTerms(processedTokens);
    }

    // 4. 각 토큰에 대해 형태소 분석
    let morphemes: string[] = [];
    for (const token of processedTokens) {
      // 한글이 아닌 경우 그대로 추가
      if (!this.isKorean(token)) {
        if (token.length >= minLength) {
          morphemes.push(token);
        }
        continue;
      }

      // 한글인 경우 형태소 분석
      const tokenMorphemes = this.analyzeSingleToken(token, decomposeCompounds);
      morphemes = morphemes.concat(tokenMorphemes);
    }

    // 5. 불용어 제거 및 최소 길이 필터링
    if (removeStopwords) {
      morphemes = this.removeStopwords(morphemes);
    }

    // 6. 최소 길이 필터링
    morphemes = morphemes.filter((m) => m.length >= minLength);

    return morphemes;
  }

  /**
   * 텍스트 정규화 (특수문자 제거, 공백 정리 등)
   * @param text 정규화할 텍스트
   * @returns 정규화된 텍스트
   */
  private normalizeText(text: string): string {
    // 기본 정규화
    let normalized = text
      .toLowerCase()
      .replace(/[^\w\s가-힣ㄱ-ㅎㅏ-ㅣ]/g, " ") // 특수문자를 공백으로 변환 (한글 자음/모음 포함)
      .replace(/\s+/g, " ") // 연속된 공백을 하나로
      .trim();

    // 반복 문자 정규화 (ㅋㅋㅋㅋ -> ㅋㅋ)
    normalized = normalized.replace(/([ㄱ-ㅎㅏ-ㅣ가-힣])\1{2,}/g, "$1$1");

    return normalized;
  }

  /**
   * 인터넷 용어 처리
   * @param tokens 처리할 토큰 배열
   * @returns 처리된 토큰 배열
   */
  private handleInternetTerms(tokens: string[]): string[] {
    const result: string[] = [];

    for (const token of tokens) {
      // 인터넷 용어 사전에 있는지 확인
      if (this.INTERNET_TERMS.has(token)) {
        result.push(token);
        continue;
      }

      // 이모티콘 처리 (ㅋㅋ, ㅎㅎ 등)
      if (/^[ㄱ-ㅎ]+$/.test(token)) {
        if (token.length >= 2) {
          result.push(token.substring(0, 2)); // 최대 2글자만 사용
        } else {
          result.push(token);
        }
        continue;
      }

      result.push(token);
    }

    return result;
  }

  /**
   * 문자열이 한글인지 확인
   * @param str 확인할 문자열
   * @returns 한글 여부
   */
  private isKorean(str: string): boolean {
    return /[가-힣ㄱ-ㅎㅏ-ㅣ]/.test(str);
  }

  /**
   * 단일 토큰에 대한 형태소 분석 (개선된 버전)
   * @param token 분석할 토큰
   * @param decomposeCompounds 복합어 분해 여부
   * @returns 분석된 형태소 배열
   */
  private analyzeSingleToken(
    token: string,
    decomposeCompounds: boolean
  ): string[] {
    const result: string[] = [];
    let processed = false;

    // 1. 복합어 처리
    if (decomposeCompounds && this.COMPOUNDS.has(token)) {
      const components = this.COMPOUNDS.get(token)!;
      result.push(...components);
      processed = true;
    }

    // 2. 접두사 처리 (개선: 정교한 접두사 처리 로직)
    if (!processed) {
      // 접두사 목록을 길이 기준으로 정렬 (긴 접두사 우선)
      const sortedPrefix = Array.from(this.PREFIX).sort(
        (a, b) => b.length - a.length
      );

      // 접두사 처리 전에 단어 길이 확인 (너무 짧은 단어는 처리하지 않음)
      if (token.length >= 4) {
        for (const prefix of sortedPrefix) {
          // 접두사가 너무 짧으면 건너뜀 (1글자 접두사는 오분석 가능성 높음)
          if (prefix.length < 2) continue;
          
          if (token.startsWith(prefix) && token.length > prefix.length + 1) {
            const stem = token.slice(prefix.length);
            
            // 접두사 분리 후 남은 부분이 너무 짧으면 분리하지 않음
            if (stem.length < 2) continue;
            
            // 접두사 분리 후 남은 부분이 의미 있는 단어인지 확인
            // 1. 남은 부분이 다른 복합어의 일부인지 확인
            let validStem = false;
            
            // 복합어 구성 요소 목록 생성
            const allComponents = new Set<string>();
            for (const components of this.COMPOUNDS.values()) {
              components.forEach(comp => allComponents.add(comp));
            }
            
            // 남은 부분이 복합어 구성 요소에 포함되는지 확인
            if (allComponents.has(stem)) {
              validStem = true;
            }
            
            // 남은 부분이 2글자 이상이고 한글로만 구성되어 있으면 유효한 것으로 간주
            // (한국어 단어의 대부분은 2글자 이상의 의미 단위로 구성됨)
            if (!validStem && stem.length >= 2 && /^[가-힣]+$/.test(stem)) {
              validStem = true;
            }
            
            // 유효한 접두사 분리로 판단되면 처리
            if (validStem) {
              result.push(prefix);
              result.push(stem);
              processed = true;
              break;
            }
          }
        }
      }
    }

    // 3. 조사 분리 (개선: 가장 긴 조사부터 확인)
    if (!processed) {
      const sortedJosa = Array.from(this.JOSA).sort(
        (a, b) => b.length - a.length
      );
      for (const josa of sortedJosa) {
        if (token.endsWith(josa) && token.length > josa.length) {
          const stem = token.slice(0, -josa.length);
          if (stem.length > 0) {
            result.push(stem);
            processed = true;
            break;
          }
        }
      }
    }

    // 4. 어미 분리 (개선: 가장 긴 어미부터 확인)
    if (!processed) {
      const sortedEomi = Array.from(this.EOMI).sort(
        (a, b) => b.length - a.length
      );
      for (const eomi of sortedEomi) {
        if (token.endsWith(eomi) && token.length > eomi.length) {
          const stem = token.slice(0, -eomi.length);
          if (stem.length > 0) {
            result.push(stem);
            processed = true;
            break;
          }
        }
      }
    }

    // 5. 접미사 분리 (개선: 가장 긴 접미사부터 확인)
    if (!processed) {
      const sortedSuffix = Array.from(this.SUFFIX).sort(
        (a, b) => b.length - a.length
      );
      for (const suffix of sortedSuffix) {
        if (token.endsWith(suffix) && token.length > suffix.length) {
          const stem = token.slice(0, -suffix.length);
          if (stem.length > 0) {
            result.push(stem);
            result.push(suffix);
            processed = true;
            break;
          }
        }
      }
    }

    // 6. 분석되지 않은 경우 원본 토큰 추가
    if (!processed || result.length === 0) {
      result.push(token);
    }

    return result;
  }

  /**
   * 불용어 제거
   * @param morphemes 형태소 배열
   * @returns 불용어가 제거된 형태소 배열
   */
  private removeStopwords(morphemes: string[]): string[] {
    return morphemes.filter((m) => !this.STOPWORDS.has(m));
  }
}

// 싱글톤 인스턴스 생성
export const koreanAnalyzer = new KoreanMorphologicalAnalyzer();
