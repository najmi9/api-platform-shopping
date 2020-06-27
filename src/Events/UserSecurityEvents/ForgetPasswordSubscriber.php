<?php

namespace App\Events\UserSecurityEvents;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use ApiPlatform\Core\Validator\ValidatorInterface;
use Doctrine\ORM\EntityManagerInterface;

final class ForgetPasswordSubscriber extends AbstractController implements EventSubscriberInterface
{
    private $userManager, $mailer, $normalizer, $em;
     private $validator;

    public function __construct(UserRepository $userManager, \Swift_Mailer $mailer, NormalizerInterface $normalizer,EntityManagerInterface $em, ValidatorInterface $validator )
    {
        $this->userManager = $userManager;
        $this->mailer = $mailer;
        $this->normalizer = $normalizer;
        $this->em = $em;
        $this->validator = $validator;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['sendPasswordReset', EventPriorities::PRE_VALIDATE],
        ];
    }

    public function sendPasswordReset(ViewEvent $event)
    {
        $request = $event->getRequest();
        if ('api_forgot_password_requests_post_collection' !== $request->attributes->get('_route')) {
            return;
        }
        
        $forgotPasswordRequest = $event->getControllerResult();
          $this->validator->validate($forgotPasswordRequest);
        
        $user = $this->userManager->findOneByEmail($forgotPasswordRequest->getEmail());
         
        if (!$user) {
        $event->setResponse(new JsonResponse([
            "status"=>404,
            "message"=>"l'utlisateur non trouvé !"
        ], 200));
        }

        if ($user) {
           $code  = mt_rand(100000, 999999);
           $user->setResetPasswordCode($code);
            $this->em->persist($user);
            $this->em->flush();
           $message =( new \Swift_Message("Mot de passe oublié"))
                    ->setFrom('noreplynajmi@gmail.com')
                    ->setTo($user->getEmail())
                    ->setBody(
                            $this->renderView(                   
                            'emails/forget_password.html.twig',
                            [
                              'user' => $user,
                              'code'=>$code
                            ]
                            )
                     , 'text/html');
            $this->mailer->send($message);
            $userNormaliser = $this->normalizer->normalize($user, null, ['groups'=>'user:read']);
            $data = json_encode($userNormaliser);
            $event->setResponse(new JsonResponse($data, 200, [], true), 200);
        }

    }
}
