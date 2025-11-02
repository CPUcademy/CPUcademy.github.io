const englishText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque suscipit nulla ullamcorper ante mollis, ac sagittis metus condimentum. Sed ex justo, mattis vel nulla a, euismod eleifend elit. Donec pellentesque velit ligula, at rutrum metus bibendum sit amet. Nullam lacus quam, aliquet et venenatis at, finibus sed dolor. Duis varius sed ipsum luctus sodales. Donec et odio vestibulum, lobortis risus in, rhoncus lectus. Quisque eu sodales sapien, et consequat ex.";
const polishText = "Aliquam dictum ipsum in dui convallis hendrerit. Proin vitae egestas lectus, sed efficitur justo. Fusce et auctor nunc. Fusce dictum molestie auctor. In hac habitasse platea dictumst. Fusce ac mi ut dui tincidunt consequat accumsan non justo. Cras non tempus nisi. Ut laoreet tempus elit, sed ultricies neque dictum eget. Sed mollis convallis ipsum, porttitor sollicitudin nibh vulputate non. Nam ultricies tincidunt dolor, a finibus enim.";
const englishTextE = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque suscipit nulla ullamcorper ante mollis, ac sagittis metus condimentum. Sed ex justo, mattis vel nulla a, euismod eleifend elit. Donec pellentesque velit ligula, at rutrum metus bibendum sit amet. Nullam lacus quam, aliquet et venenatis at, finibus sed dolor. Duis varius sed ipsum luctus sodales. Donec et odio vestibulum, lobortis risus in, rhoncus lectus. Quisque eu sodales sapien, et consequat ex. Fusce feugiat sapien ligula, sit amet varius tortor aliquet sed. Donec rhoncus ante nec nibh fringilla sodales. Aliquam dictum ipsum in dui convallis hendrerit. Proin vitae egestas lectus, sed efficitur justo. Fusce et auctor nunc. Fusce dictum molestie auctor. In hac habitasse platea dictumst. Fusce ac mi ut dui tincidunt consequat accumsan non justo. Cras non tempus nisi. Ut laoreet tempus elit, sed ultricies neque dictum eget. Sed mollis convallis ipsum, porttitor sollicitudin nibh vulputate non. Nam ultricies tincidunt dolor, a finibus enim. Vivamus consequat urna at magna elementum, vel vulputate turpis laoreet.";
const polishTextE = "Aliquam dictum ipsum in dui convallis hendrerit. Proin vitae egestas lectus, sed efficitur justo. Fusce et auctor nunc. Fusce dictum molestie auctor. In hac habitasse platea dictumst. Fusce ac mi ut dui tincidunt consequat accumsan non justo. Cras non tempus nisi. Ut laoreet tempus elit, sed ultricies neque dictum eget. Sed mollis convallis ipsum, porttitor sollicitudin nibh vulputate non. Nam ultricies tincidunt dolor, a finibus enim. Vivamus consequat urna at magna elementum, vel vulputate turpis laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque suscipit nulla ullamcorper ante mollis, ac sagittis metus condimentum. Sed ex justo, mattis vel nulla a, euismod eleifend elit. Donec pellentesque velit ligula, at rutrum metus bibendum sit amet. Nullam lacus quam, aliquet et venenatis at, finibus sed dolor. Duis varius sed ipsum luctus sodales. Donec et odio vestibulum, lobortis risus in, rhoncus lectus. Quisque eu sodales sapien, et consequat ex. Fusce feugiat sapien ligula, sit amet varius tortor aliquet sed. Donec rhoncus ante nec nibh fringilla sodales.";
const englishFlag = "files/englishFlag.png";
const polishFlag = "files/polishFlag.png";

const m1_p = "Muscle Up - aplikacja treningowa wykorzystująca AI do analizy treningów przez kamerę w czasie rzeczywistym. Ten projekt był projektem finałowym w konkursie Explory 2025. Uważam, że każdy powinien uprawiać sport kilka razy w tygodniu, ale czy każdy ma do tego motywację, a co ważniejsze - wie, jak robić to poprawnie? Tu może przydać się moja aplikacja treningowa – Muscle Up. Wykorzystuje ona sztuczną inteligencję do weryfikacji i liczenia ćwiczeń. Działa jak gra, motywując użytkowników do systematycznej pracy poprzez rywalizację. Usuwa ona potrzebę zastanawiania się nad liczbą wykonanych powtórzeń i formą, poprzez wysyłanie odpowiednich sygnałów dźwiękowych w trakcie wykonywania ćwiczenia. Interfejs został zaprojektowany w sposób minimalistyczny i prosty w obsłudze, aby nikogo nie rozpraszać. Takie funkcjonalności przydadzą się osobom z problemami ze skupieniem, np. z ADHD. Wszystkie dodatkowe operacje potrzebne podczas treningu, jak odtwarzanie muzyki czy liczenie czasu, są zaimplementowane w aplikacji, aby użytkownik nie musiał z niej wychodzić w jego trakcie."
const m2_p = "Muscle Up korzysta z modelu sztucznej inteligencji Mediapipe, który wyznacza istotne punkty na ciele człowieka w czasie rzeczywistym. Licząc kąty między tymi punktami oraz biorąc pod uwagę ich pozycję w układzie współrzędnych, możemy stwierdzić, czy ćwiczenie jest wykonywane poprawnie. Pracę zacząłem od stworzenia prototypu z użyciem mikrokomputera Raspberry Pi i kamery USB, ale stwierdziłem, że byłoby lepiej, gdyby każdy miał dostęp do mojego produktu bez kupowania fizycznego urządzenia, więc wdrożyłem wszystko w aplikacji."
const m3_p = "Według badania, które przeprowadziłem, moje rozwiązanie jest na ten moment najbardziej rozwiniętym tego typu na rynku. Wszystkie istniejące produkty w tym stylu mają ograniczone funkcjonalności oraz bazę ćwiczeń, na podstawie której nie da się ułożyć dobrego treningu. W trakcie tworzenia projektu przeprowadzałem także wiele testów i ankiet na temat UI/UX z kolegami i rodziną, a po wszystkich wprowadzonych zmianach odbiór jest pozytywny. Myślę, że Muscle Up pomoże wielu osobom z problemami ze skupieniem (ale nie tylko), zmotywuje do aktywności fizycznej i poprawi jakość oraz efektywność treningów."
const m4_p = "Plakat projektu z konkursu Explory 2025:"
const m1_e = "Muscle Up - a fitness app that uses AI to analyze workouts in real-time through a camera. This project made it to the finals of the Explory 2025 competition. I believe that everyone should exercise several times a week, but does everyone have the motivation - and, more importantly, do they know how to do it correctly? This is where my training application, Muscle Up, can be useful. It uses artificial intelligence to verify and count exercises. It works like a game, motivating users to stay consistent through competition. It removes the need to think about the number of repetitions or proper form by providing sound signals during the workout. The interface was designed to be minimalist and easy to use, so as not to distract anyone. Such functionalities can be especially helpful for people who struggle with focus, such as those with ADHD. All additional operations needed during a workout, such as playing music or tracking time, are implemented in the app so that the user doesn’t have to leave it during training."
const m2_e = "Muscle Up uses the Mediapipe artificial intelligence model, which detects key points on the human body in real time. By calculating the angles between these points and considering their position in the coordinate system, we can determine whether the exercise is performed correctly. I began by creating a prototype using a Raspberry Pi microcomputer and a USB camera, but I realized it would be better if everyone could access my product without buying physical hardware, so I implemented everything within a mobile application."
const m3_e = "According to the research I conducted, my solution is currently the most advanced of its kind on the market. All existing products of this type have limited functionality and an exercise database that does not allow for creating a complete workout. During the development process, I also conducted numerous tests and UI/UX surveys with friends and family. After implementing all the feedback, the reception has been overwhelmingly positive. I believe that Muscle Up will help many people with focus-related issues (but not only them), motivate users to exercise regularly, and enhance the quality and effectiveness of their workouts."
const m4_e = "Explory 2025 competition project poster:"

let textElement, text1, text2, m1, m2, m3, m4, imgElement;

function setVars() {
  const path = window.location.pathname;
  if (path.endsWith("index.html") || path.endsWith("cv.html")) {
    textElement = document.getElementById("cv");
    textElement.innerHTML = path.endsWith("cv.html") ? englishTextE : englishText;
  }

  if (path.endsWith("muscleup.html")) {
    m1 = document.getElementById("m1");
    m2 = document.getElementById("m2");
    m3 = document.getElementById("m3");
    m4 = document.getElementById("m4");
    m1.innerHTML = m1_e;
    m2.innerHTML = m2_e;
    m3.innerHTML = m3_e;
    m4.innerHTML = m4_e;
  }

  imgElement = document.querySelector(".flag");
}

function language(additional) {
  if (typeof textElement === 'undefined' || textElement === null)
    textElement = document.getElementById("cv");
  const isEnglish = textElement.innerHTML === englishText || textElement.innerHTML === englishTextE;

  if (additional) {
    text1 = document.getElementById("importantlinks");
    text2 = document.getElementById("services");
    textElement.innerHTML = isEnglish ? polishText : englishText;
    text1.innerHTML = isEnglish ? "Ważne odnośniki" : "Important links";
    text2.innerHTML = isEnglish ? "Moje usługi" : "My services";
  } else {
    textElement.innerHTML = isEnglish ? polishTextE : englishTextE;
  }

  imgElement.src = imgElement.src.includes(polishFlag) ? englishFlag : polishFlag;
}

function languageM() {
  const isEnglish = m1.innerHTML === m1_e;

  m1.innerHTML = isEnglish ? m1_p : m1_e;
  m2.innerHTML = isEnglish ? m2_p : m2_e;
  m3.innerHTML = isEnglish ? m3_p : m3_e;
  m4.innerHTML = isEnglish ? m4_p : m4_e;

  imgElement.src = imgElement.src.includes(polishFlag) ? englishFlag : polishFlag;
}

document.addEventListener("DOMContentLoaded", setVars);

/*!
 * This license applies to the code below.
 * Start Bootstrap - SB Admin 2 v4.1.3 (https://startbootstrap.com/theme/sb-admin-2)
 * Copyright 2013-2021 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin-2/blob/master/LICENSE)
 * Bootstrap v4.6.0 (https://getbootstrap.com/)
 * Copyright 2011-2021 The Bootstrap Authors
 * Copyright 2011-2021 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */

(function($) {
  "use strict"

  $("#sidebarToggle, #sidebarToggleTop").on("click", function(e) {
    $("body").toggleClass("sidebar-toggled")
    $(".sidebar").toggleClass("toggled")
    if ($(".sidebar").hasClass("toggled"))
      $(".sidebar .collapse").collapse("hide")
  })

  $(window).resize(function() {
    if ($(window).width() < 768) {
      $(".sidebar .collapse").collapse("hide")
    }
    if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
      $("body").addClass("sidebar-toggled")
      $(".sidebar").addClass("toggled")
      $(".sidebar .collapse").collapse("hide")
    }
  })

  $("body.fixed-nav .sidebar").on("mousewheel DOMMouseScroll wheel", function(e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail
      this.scrollTop += (delta < 0 ? 1 : -1) * 30
      e.preventDefault();
    }
  })

})(jQuery)
