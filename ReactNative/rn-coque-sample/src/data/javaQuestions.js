// Java 학습 데이터 - 월드, 스테이지, 문제 구조

export const javaData = {
  worlds: [
    {
      id: 'world1',
      name: '기본 문법',
      description: 'Java의 기초를 다지는 첫 걸음',
      icon: '📚',
      color: '#4CAF50',
    },
    {
      id: 'world2',
      name: '객체지향',
      description: '클래스와 객체의 세계로',
      icon: '🏛️',
      color: '#2196F3',
    },
  ],
  
  stages: {
    // 월드 1: 기본 문법
    world1: [
      { id: 'w1s1', name: '변수와 자료형', stageNumber: 1 },
      { id: 'w1s2', name: '연산자', stageNumber: 2 },
      { id: 'w1s3', name: '조건문', stageNumber: 3 },
      { id: 'w1s4', name: '반복문', stageNumber: 4 },
      { id: 'w1s5', name: '배열', stageNumber: 5 },
    ],
    // 월드 2: 객체지향
    world2: [
      { id: 'w2s1', name: '클래스와 객체', stageNumber: 1 },
      { id: 'w2s2', name: '상속', stageNumber: 2 },
      { id: 'w2s3', name: '다형성', stageNumber: 3 },
      { id: 'w2s4', name: '추상화', stageNumber: 4 },
      { id: 'w2s5', name: '인터페이스', stageNumber: 5 },
    ],
  },
  
  questions: {
    // 월드 1 - 스테이지 1: 변수와 자료형
    w1s1: [
      {
        id: 'w1s1q1',
        type: 'multiple_choice',
        question: 'Java에서 정수형 변수를 선언하는 키워드는?',
        options: ['int', 'integer', 'number', 'num'],
        answer: 'int',
        explanation: 'int는 32비트 정수를 저장하는 기본 자료형입니다.',
        difficulty: '초급',
        hints: [
          '3글자로 된 키워드입니다.',
          'integer의 줄임말입니다.',
        ],
      },
      {
        id: 'w1s1q2',
        type: 'fill_blank',
        question: 'Java에서 문자열을 선언하는 클래스는 _____ 입니다.',
        options: ['String', 'Text', 'Char', 'Word'],
        answer: 'String',
        explanation: 'String은 문자열을 다루는 클래스입니다.',
        difficulty: '초급',
        hints: [
          '대문자 S로 시작합니다.',
          '영어로 "문자열"을 의미하는 단어입니다.',
        ],
      },
      {
        id: 'w1s1q3',
        type: 'multiple_choice',
        question: '실수형 변수를 저장하는 키워드가 아닌 것은?',
        options: ['float', 'double', 'decimal', 'real'],
        answer: 'decimal',
        explanation: 'Java에서 실수형은 float와 double만 있습니다. decimal과 real은 존재하지 않습니다.',
        difficulty: '초급',
        hints: [
          'Java에는 decimal이라는 자료형이 없습니다.',
          'float와 double만 실수형 자료형입니다.',
        ],
      },
      {
        id: 'w1s1q4',
        type: 'order',
        question: '다음 변수 선언문을 올바른 순서로 배열하세요.',
        items: ['int', 'age', '=', '25', ';'],
        answer: ['int', 'age', '=', '25', ';'],
        explanation: 'Java 변수 선언은 "타입 변수명 = 값;" 순서입니다.',
        difficulty: '초급',
        hints: [
          '타입(int)이 가장 먼저 옵니다.',
          '변수명, 대입 연산자, 값, 세미콜론 순서입니다.',
        ],
      },
      {
        id: 'w1s1q5',
        type: 'multiple_choice',
        question: 'boolean 자료형이 저장할 수 있는 값은?',
        options: ['true와 false', '0과 1', 'yes와 no', 'on과 off'],
        answer: 'true와 false',
        explanation: 'boolean은 true 또는 false 값만 저장합니다.',
        difficulty: '초급',
        hints: [
          '참과 거짓을 의미하는 영어 단어입니다.',
          '소문자로 작성해야 합니다.',
        ],
      },
      {
        id: 'w1s1q6',
        type: 'fill_blank',
        question: '문자 하나를 저장하는 자료형은 _____ 입니다.',
        options: ['char', 'character', 'chr', 'letter'],
        answer: 'char',
        explanation: 'char는 16비트 유니코드 문자를 저장합니다.',
        difficulty: '초급',
        hints: [
          'character의 줄임말입니다.',
          '4글자로 된 키워드입니다.',
        ],
      },
    ],
    
    // 월드 1 - 스테이지 2: 연산자
    w1s2: [
      {
        id: 'w1s2q1',
        type: 'multiple_choice',
        question: 'Java의 산술 연산자가 아닌 것은?',
        options: ['+', '-', '*', '#'],
        answer: '#',
        explanation: 'Java의 산술 연산자는 +, -, *, /, % 입니다. #은 연산자가 아닙니다.',
        difficulty: '초급',
      },
      {
        id: 'w1s2q2',
        type: 'ox_quiz',
        question: '++ 연산자는 변수의 값을 1 증가시킨다.',
        answer: 'O',
        explanation: 'i++는 i = i + 1과 같은 의미로 값을 1 증가시킵니다.',
        difficulty: '초급',
      },
      {
        id: 'w1s2q3',
        type: 'multiple_choice',
        question: '== 연산자와 equals() 메서드의 설명으로 옳은 것은?',
        options: [
          '==는 내용을 비교한다',
          'equals()는 주소를 비교한다',
          '==는 주소(참조)를 비교한다',
          '둘 다 똑같다'
        ],
        answer: '==는 주소(참조)를 비교한다',
        explanation: '==는 메모리 주소를 비교하고, equals()는 객체의 내용을 비교합니다.',
        difficulty: '중급',
      },
      {
        id: 'w1s2q4',
        type: 'fill_blank',
        question: '논리 연산자 AND를 표현하는 기호는 _____ 입니다.',
        options: ['&&', '||', '!', '&'],
        answer: '&&',
        explanation: '&&는 두 조건이 모두 참일 때 참을 반환합니다.',
        difficulty: '초급',
      },
      {
        id: 'w1s2q5',
        type: 'order',
        question: '삼항 연산자의 올바른 순서를 배열하세요.',
        items: ['조건', '?', '참값', ':', '거짓값'],
        answer: ['조건', '?', '참값', ':', '거짓값'],
        explanation: '형식: 조건 ? 참일때값 : 거짓일때값',
        difficulty: '중급',
      },
      {
        id: 'w1s2q6',
        type: 'ox_quiz',
        question: '10 % 3의 결과값은 3이다.',
        answer: 'X',
        explanation: '10을 3으로 나눈 나머지는 1입니다.',
        difficulty: '초급',
      },
    ],
    
    // 월드 1 - 스테이지 3: 조건문
    w1s3: [
      {
        id: 'w1s3q1',
        type: 'multiple_choice',
        question: 'if문의 올바른 기본 구조는?',
        options: [
          'if (조건) { 실행문; }',
          'if { 실행문; } (조건)',
          'when (조건) { 실행문; }',
          'check (조건) { 실행문; }'
        ],
        answer: 'if (조건) { 실행문; }',
        explanation: '조건이 참일 때 중괄호 안의 코드가 실행됩니다.',
        difficulty: '초급',
      },
      {
        id: 'w1s3q2',
        type: 'multiple_choice',
        question: 'else if를 사용하는 주된 이유는?',
        options: [
          '여러 조건을 순차적으로 검사하기 위해',
          '반복을 수행하기 위해',
          '예외를 처리하기 위해',
          '변수를 선언하기 위해'
        ],
        answer: '여러 조건을 순차적으로 검사하기 위해',
        explanation: '첫 번째 조건이 거짓일 때 다음 조건을 검사합니다.',
        difficulty: '초급',
      },
      {
        id: 'w1s3q3',
        type: 'ox_quiz',
        question: 'switch문에서 break가 없으면 다음 case도 실행된다.',
        answer: 'O',
        explanation: 'break가 없으면 다음 case도 실행되는 fall-through 현상이 발생합니다.',
        difficulty: '중급',
      },
      {
        id: 'w1s3q4',
        type: 'multiple_choice',
        question: 'switch문의 default는 언제 실행되나요?',
        options: [
          '모든 case가 일치하지 않을 때',
          '가장 먼저 실행됨',
          '에러가 발생했을 때',
          '항상 실행됨'
        ],
        answer: '모든 case가 일치하지 않을 때',
        explanation: 'default는 선택사항이며, 보통 마지막에 작성합니다.',
        difficulty: '초급',
      },
      {
        id: 'w1s3q5',
        type: 'ox_quiz',
        question: 'if문 안에 또 다른 if문을 넣을 수 없다.',
        answer: 'X',
        explanation: 'if문 안에 if문을 넣는 중첩 if문(Nested If)은 가능합니다.',
        difficulty: '중급',
      },
    ],
    
    // 월드 1 - 스테이지 4: 반복문
    w1s4: [
      {
        id: 'w1s4q1',
        type: 'order',
        question: 'for문의 실행 순서를 올바르게 배열하세요.',
        items: ['초기화', '조건식', '실행문', '증감식'],
        answer: ['초기화', '조건식', '실행문', '증감식'],
        explanation: '초기화 -> 조건식 -> 실행문 -> 증감식 순서로 실행됩니다.',
        difficulty: '초급',
      },
      {
        id: 'w1s4q2',
        type: 'multiple_choice',
        question: 'do-while문의 특징으로 옳은 것은?',
        options: [
          '조건에 상관없이 무조건 최소 1번 실행된다',
          '조건이 거짓이면 한 번도 실행되지 않는다',
          '무한 루프를 만들 수 없다',
          'for문보다 빠르다'
        ],
        answer: '조건에 상관없이 무조건 최소 1번 실행된다',
        explanation: 'do-while은 실행문을 먼저 실행하고 조건을 검사합니다.',
        difficulty: '중급',
      },
      {
        id: 'w1s4q3',
        type: 'fill_blank',
        question: '반복문을 즉시 종료하는 키워드는 _____ 입니다.',
        options: ['break', 'stop', 'exit', 'end'],
        answer: 'break',
        explanation: '가장 가까운 반복문을 빠져나갑니다.',
        difficulty: '초급',
      },
      {
        id: 'w1s4q4',
        type: 'multiple_choice',
        question: 'continue문의 역할은?',
        options: [
          '현재 반복을 건너뛰고 다음 반복으로 이동',
          '반복문을 완전히 종료',
          '프로그램을 종료',
          '이전 반복으로 되돌아감'
        ],
        answer: '현재 반복을 건너뛰고 다음 반복으로 이동',
        explanation: 'continue 이후의 코드는 실행되지 않습니다.',
        difficulty: '중급',
      },
      {
        id: 'w1s4q5',
        type: 'fill_blank',
        question: '향상된 for문: for (타입 변수 : _____) { }',
        options: ['배열', '조건', '숫자', '문자열'],
        answer: '배열',
        explanation: '배열이나 컬렉션의 요소를 순회할 때 사용합니다.',
        difficulty: '중급',
      },
      {
        id: 'w1s4q6',
        type: 'multiple_choice',
        question: '무한 루프를 만드는 코드가 아닌 것은?',
        options: ['while(false)', 'while(true)', 'for(;;)', 'do { } while(true)'],
        answer: 'while(false)',
        explanation: 'while(false)는 실행되지 않는 코드입니다.',
        difficulty: '초급',
      },
      {
        id: 'w1s4q7',
        type: 'ox_quiz',
        question: '반복문 안에 또 다른 반복문을 사용할 수 있다.',
        answer: 'O',
        explanation: '중첩 반복문은 2차원 배열 처리 등에 자주 사용됩니다.',
        difficulty: '중급',
      },
    ],
    
    // 월드 1 - 스테이지 5: 배열
    w1s5: [
      {
        id: 'w1s5q1',
        type: 'multiple_choice',
        question: '배열을 선언하는 올바른 방법은?',
        options: [
          'int[] arr = new int[5];',
          'int arr = new int(5);',
          'array arr = new int[5];',
          'int arr[] = int[5];'
        ],
        answer: 'int[] arr = new int[5];',
        explanation: '타입[] 변수명 = new 타입[크기]; 형식이 올바릅니다.',
        difficulty: '초급',
      },
      {
        id: 'w1s5q2',
        type: 'fill_blank',
        question: '배열의 길이를 구하는 속성은 _____ 입니다.',
        options: ['length', 'size', 'count', 'len'],
        answer: 'length',
        explanation: '배열명.length로 길이를 구할 수 있습니다.',
        difficulty: '초급',
      },
      {
        id: 'w1s5q3',
        type: 'multiple_choice',
        question: '크기가 5인 배열의 마지막 인덱스는?',
        options: ['4', '5', '1', '0'],
        answer: '4',
        explanation: '인덱스는 0부터 시작하므로 마지막 인덱스는 길이-1 입니다.',
        difficulty: '초급',
      },
      {
        id: 'w1s5q4',
        type: 'ox_quiz',
        question: '배열 생성 시 크기를 지정하지 않아도 된다.',
        answer: 'X',
        explanation: '배열 생성 시 반드시 크기를 지정하거나 초기값을 주어야 합니다.',
        difficulty: '초급',
      },
      {
        id: 'w1s5q5',
        type: 'multiple_choice',
        question: '2차원 배열 선언으로 올바른 것은?',
        options: [
          'int[][] arr = new int[3][4];',
          'int[] arr = new int[3][4];',
          'int arr[][] = new int(3,4);',
          '2d arr = new int[3][4];'
        ],
        answer: 'int[][] arr = new int[3][4];',
        explanation: '2차원 배열은 대괄호 2개([][])를 사용합니다.',
        difficulty: '중급',
      },
    ],
    
    // 월드 2 - 스테이지 1: 클래스와 객체
    w2s1: [
      {
        id: 'w2s1q1',
        type: 'ox_quiz',
        question: '클래스는 객체를 만들기 위한 설계도이다.',
        answer: 'O',
        explanation: '클래스는 설계도(틀)이고, 객체는 그 설계도로 만들어진 실체입니다.',
        difficulty: '중급',
      },
      {
        id: 'w2s1q2',
        type: 'fill_blank',
        question: '객체를 생성할 때 사용하는 키워드는 _____ 입니다.',
        options: ['new', 'create', 'make', 'obj'],
        answer: 'new',
        explanation: '예: Car myCar = new Car();',
        difficulty: '초급',
      },
      {
        id: 'w2s1q3',
        type: 'multiple_choice',
        question: '생성자(Constructor)에 대한 설명으로 틀린 것은?',
        options: [
          '클래스 이름과 동일해야 한다',
          '반환 타입이 없다',
          '객체 생성 시 호출된다',
          '반드시 void를 붙여야 한다'
        ],
        answer: '반드시 void를 붙여야 한다',
        explanation: '생성자는 반환 타입을 명시하지 않습니다(void도 안 씀).',
        difficulty: '중급',
      },
      {
        id: 'w2s1q4',
        type: 'multiple_choice',
        question: 'this 키워드가 가리키는 것은?',
        options: [
          '현재 객체 자신',
          '부모 클래스',
          '자식 클래스',
          '메인 메서드'
        ],
        answer: '현재 객체 자신',
        explanation: '멤버 변수와 매개변수를 구분할 때 주로 사용합니다.',
        difficulty: '중급',
      },
      {
        id: 'w2s1q5',
        type: 'ox_quiz',
        question: '메서드 오버로딩은 매개변수의 개수나 타입이 같아도 된다.',
        answer: 'X',
        explanation: '오버로딩은 매개변수의 개수나 타입이 달라야 성립합니다.',
        difficulty: '고급',
      },
      {
        id: 'w2s1q6',
        type: 'multiple_choice',
        question: 'static 멤버에 대한 설명으로 옳은 것은?',
        options: [
          '객체를 생성해야만 사용할 수 있다',
          '모든 객체가 공유하는 변수다',
          'this 키워드를 사용할 수 있다',
          '지역 변수로 선언할 수 있다'
        ],
        answer: '모든 객체가 공유하는 변수다',
        explanation: 'static 멤버는 클래스 로딩 시 생성되며 모든 객체가 공유합니다.',
        difficulty: '중급',
      },
    ],
    
    // 월드 2 - 스테이지 2: 상속
    w2s2: [
      {
        id: 'w2s2q1',
        type: 'fill_blank',
        question: '상속을 받기 위해 사용하는 키워드는 _____ 입니다.',
        options: ['extends', 'implements', 'inherit', 'super'],
        answer: 'extends',
        explanation: '예: class Dog extends Animal { }',
        difficulty: '중급',
      },
      {
        id: 'w2s2q2',
        type: 'multiple_choice',
        question: 'super 키워드의 용도는?',
        options: [
          '부모 클래스의 멤버나 생성자 호출',
          '현재 객체 참조',
          '상수 선언',
          '패키지 가져오기'
        ],
        answer: '부모 클래스의 멤버나 생성자 호출',
        explanation: 'super.변수 또는 super() 형태로 사용합니다.',
        difficulty: '중급',
      },
      {
        id: 'w2s2q3',
        type: 'ox_quiz',
        question: '오버라이딩(Overriding)은 부모의 메서드를 자식에서 재정의하는 것이다.',
        answer: 'O',
        explanation: '메서드 시그니처가 동일해야 하며, 내용만 변경합니다.',
        difficulty: '고급',
      },
      {
        id: 'w2s2q4',
        type: 'ox_quiz',
        question: 'Java는 클래스의 다중 상속을 지원한다.',
        answer: 'X',
        explanation: 'Java는 단일 상속만 지원합니다. (인터페이스는 다중 구현 가능)',
        difficulty: '중급',
      },
      {
        id: 'w2s2q5',
        type: 'multiple_choice',
        question: 'final 클래스의 특징은?',
        options: [
          '상속할 수 없다',
          '객체를 생성할 수 없다',
          '메서드가 없다',
          '추상 메서드만 가진다'
        ],
        answer: '상속할 수 없다',
        explanation: '보안이나 설계상의 이유로 상속을 금지할 때 사용합니다.',
        difficulty: '고급',
      },
    ],
    
    // 월드 2 - 스테이지 3: 다형성
    w2s3: [
      {
        id: 'w2s3q1',
        type: 'multiple_choice',
        question: '다형성(Polymorphism)의 설명으로 가장 적절한 것은?',
        options: [
          '하나의 타입으로 여러 구현체를 다룰 수 있는 특성',
          '여러 개의 부모 클래스를 상속받는 것',
          '데이터를 외부로부터 숨기는 것',
          '객체를 생성하지 않고 사용하는 것'
        ],
        answer: '하나의 타입으로 여러 구현체를 다룰 수 있는 특성',
        explanation: '부모 타입으로 자식 객체를 참조할 수 있습니다.',
        difficulty: '고급',
      },
      {
        id: 'w2s3q2',
        type: 'ox_quiz',
        question: '업캐스팅(Upcasting)은 명시적 형변환이 필요하다.',
        answer: 'X',
        explanation: '자식 객체를 부모 타입으로 변환하는 업캐스팅은 자동으로 이루어집니다.',
        difficulty: '고급',
      },
      {
        id: 'w2s3q3',
        type: 'ox_quiz',
        question: '다운캐스팅(Downcasting)은 실행 시 에러가 발생할 수 있다.',
        answer: 'O',
        explanation: '잘못된 타입으로 변환 시 ClassCastException이 발생할 수 있습니다.',
        difficulty: '고급',
      },
      {
        id: 'w2s3q4',
        type: 'multiple_choice',
        question: '객체의 실제 타입을 확인할 때 사용하는 연산자는?',
        options: ['instanceof', 'typeof', 'is', 'check'],
        answer: 'instanceof',
        explanation: '다운캐스팅 전에 안전성을 확인할 때 사용합니다.',
        difficulty: '중급',
      },
      {
        id: 'w2s3q5',
        type: 'multiple_choice',
        question: '동적 바인딩(Dynamic Binding)이란?',
        options: [
          '실행 시점에 실제 객체의 메서드가 호출되는 것',
          '컴파일 시점에 호출될 메서드가 결정되는 것',
          '변수의 타입이 실행 중에 바뀌는 것',
          '객체가 자동으로 생성되는 것'
        ],
        answer: '실행 시점에 실제 객체의 메서드가 호출되는 것',
        explanation: '오버라이딩된 메서드는 동적 바인딩됩니다.',
        difficulty: '고급',
      },
    ],
    
    // 월드 2 - 스테이지 4: 추상화
    w2s4: [
      {
        id: 'w2s4q1',
        type: 'fill_blank',
        question: '추상 클래스를 선언하는 키워드는 _____ 입니다.',
        options: ['abstract', 'interface', 'virtual', 'static'],
        answer: 'abstract',
        explanation: '예: abstract class Animal { }',
        difficulty: '중급',
      },
      {
        id: 'w2s4q2',
        type: 'ox_quiz',
        question: '추상 메서드는 구현부({ })가 없다.',
        answer: 'O',
        explanation: '선언부만 있고 구현부는 자식 클래스에서 만들어야 합니다.',
        difficulty: '중급',
      },
      {
        id: 'w2s4q3',
        type: 'ox_quiz',
        question: '추상 클래스는 new 키워드로 객체를 생성할 수 있다.',
        answer: 'X',
        explanation: '추상 클래스는 미완성 클래스이므로 직접 객체를 생성할 수 없습니다.',
        difficulty: '중급',
      },
      {
        id: 'w2s4q4',
        type: 'multiple_choice',
        question: '추상 클래스와 인터페이스의 차이점은?',
        options: [
          '추상 클래스는 일반 메서드를 가질 수 있다',
          '인터페이스는 생성자를 가질 수 있다',
          '추상 클래스는 다중 상속이 가능하다',
          '인터페이스는 변수를 가질 수 없다'
        ],
        answer: '추상 클래스는 일반 메서드를 가질 수 있다',
        explanation: '인터페이스는 Java 8 이전에는 추상 메서드만 가질 수 있었습니다.',
        difficulty: '고급',
      },
      {
        id: 'w2s4q5',
        type: 'multiple_choice',
        question: '추상화의 주된 목적은?',
        options: [
          '공통 기능을 정의하고 구체적 구현은 자식에게 위임',
          '코드를 짧게 만들기 위해',
          '실행 속도를 높이기 위해',
          '메모리를 절약하기 위해'
        ],
        answer: '공통 기능을 정의하고 구체적 구현은 자식에게 위임',
        explanation: '코드 재사용성과 유지보수성을 높입니다.',
        difficulty: '고급',
      },
      {
        id: 'w2s4q6',
        type: 'ox_quiz',
        question: '추상 클래스에도 생성자가 있을 수 있다.',
        answer: 'O',
        explanation: '자식 클래스에서 super()로 호출되어 초기화 작업을 수행할 수 있습니다.',
        difficulty: '고급',
      },
    ],
    
    // 월드 2 - 스테이지 5: 인터페이스
    w2s5: [
      {
        id: 'w2s5q1',
        type: 'fill_blank',
        question: '인터페이스를 선언하는 키워드는 _____ 입니다.',
        options: ['interface', 'abstract', 'class', 'implements'],
        answer: 'interface',
        explanation: '예: interface Drawable { }',
        difficulty: '중급',
      },
      {
        id: 'w2s5q2',
        type: 'fill_blank',
        question: '클래스가 인터페이스를 구현할 때 쓰는 키워드는 _____ 입니다.',
        options: ['implements', 'extends', 'using', 'interface'],
        answer: 'implements',
        explanation: '예: class Circle implements Drawable { }',
        difficulty: '중급',
      },
      {
        id: 'w2s5q3',
        type: 'multiple_choice',
        question: '인터페이스의 메서드는 기본적으로 어떤 접근 제어자를 갖나요?',
        options: ['public abstract', 'private', 'protected', 'default'],
        answer: 'public abstract',
        explanation: '명시하지 않아도 자동으로 public abstract가 붙습니다.',
        difficulty: '고급',
      },
      {
        id: 'w2s5q4',
        type: 'multiple_choice',
        question: '인터페이스의 변수는 기본적으로 무엇인가요?',
        options: ['public static final (상수)', 'private variable', 'protected field', 'instance variable'],
        answer: 'public static final (상수)',
        explanation: '인터페이스의 변수는 무조건 상수입니다.',
        difficulty: '고급',
      },
      {
        id: 'w2s5q5',
        type: 'ox_quiz',
        question: '하나의 클래스가 여러 개의 인터페이스를 구현할 수 있다.',
        answer: 'O',
        explanation: '쉼표로 구분하여 다중 구현이 가능합니다.',
        difficulty: '중급',
      },
      {
        id: 'w2s5q6',
        type: 'multiple_choice',
        question: 'Java 8부터 인터페이스에 추가된, 구현부를 가진 메서드는?',
        options: ['default 메서드', 'static 메서드', 'abstract 메서드', 'final 메서드'],
        answer: 'default 메서드',
        explanation: '기존 인터페이스에 새 메서드를 추가할 때 하위 호환성을 위해 도입되었습니다.',
        difficulty: '고급',
      },
      {
        id: 'w2s5q7',
        type: 'multiple_choice',
        question: '추상 메서드가 하나만 있는 인터페이스를 무엇이라 하나요?',
        options: ['함수형 인터페이스', '단일 인터페이스', '추상 인터페이스', '람다 인터페이스'],
        answer: '함수형 인터페이스',
        explanation: '람다 표현식과 함께 사용됩니다.',
        difficulty: '고급',
      },
    ],
  },
};

export default javaData;
