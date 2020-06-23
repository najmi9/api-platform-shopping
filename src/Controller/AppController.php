<?php

namespace App\Controller;

use Symfony\Component\Security\Csrf\TokenGenerator\TokenGeneratorInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Form\ResetPasswordType;


class AppController extends AbstractController
{
    /**
     * @Route(path="/", name="home")
     */
    public function index()
    {
        return $this->render('app/index.html.twig');
    }

     /**
      * @Route("/forgotten-password", name="forget-email", methods={"POST"})
      */
     
     public function emailForget(Request $request, UserRepository $userRepo,TokenGeneratorInterface $tokenGenerator, \Swift_Mailer $mailer,EntityManagerInterface $em)
     {
        
        $res = json_decode($request->getContent(), true);

        if (!$res) {
            return $this->json([
                  "status"=>404,
                  "message"=>"email non trouvé"
                  ], 
            200);
        }
        $email = $res["userEmail"];
         $user = $userRepo->findOneByemail($email) ;

       if (!$user) {
            return $this->json(
                [
                  "status"=>404,
                  "message"=>"utilisateur non trouvé"
                ], 
            200);
        }

         $token =$tokenGenerator->generateToken();
           $message =( new \Swift_Message("Mot de passe oublié"))
                    ->setFrom('noreplynajmi@gmail.com')
                    ->setTo($user->getEmail())
                    ->setBody(
                            $this->renderView(                   
                            'emails/forget_password.html.twig',
                            [
                              'user' => $user,
                              'token'=>$token
                            ]
                            )
                     , 'text/html');
            $mailer->send($message);

       $user->setResetActivationToken($token);
       $em->persist($user);
       $em->flush();

       return $this->json(
        [
        "status"=>200,
        "message"=>"vérifier votre email et cliquer sur le lein pour  changer votre mot de passe !"
        ], 
        200);
        
     }

     /**
      * @Route("/account/reset-password/{token}", name="reset-password")
      */
     public function FunctionName(string $token,Request $request, UserRepository $userRepo, EntityManagerInterface $em, UserPasswordEncoderInterface $passwordEncoder)
     {
         $user = $userRepo->findOneByResetActivationToken($token);
         if (!$user) {
          $this->addFlash("danger", "L'utilisateur non trouvé !");
          return $this->redirectToRoute('home');
         }

        $form = $this->createForm(ResetPasswordType::class);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $user->setResetActivationToken(null);
            $user->setPassword($passwordEncoder->encodePassword($user, $form->get('password')->getData()));
            $em->persist($user);
            $em->flush();
            $this->addFlash('success', 'Mot de passe mis à jour');
            return $this->redirectToRoute('home');
        }
         return $this->render('security/reset_password.html.twig',[
         
         'NewPasswordForm'=>$form->createView()
  
         ]);
     }
    
}
