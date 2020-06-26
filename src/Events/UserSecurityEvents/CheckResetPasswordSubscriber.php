<?php

namespace App\Events\UserSecurityEvents;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use App\Repository\UserRepository;



final class CheckResetPasswordSubscriber implements EventSubscriberInterface
{
    private $encoder, $em, $userRepo;

    public function __construct(UserPasswordEncoderInterface $encoder, EntityManagerInterface $em, UserRepository $userRepo, NormalizerInterface $normalizer)
    {
        $this->encoder = $encoder;
        $this->em = $em;
        $this->userRepo = $userRepo;
        $this->normalizer = $normalizer;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['checkPasswordReset', EventPriorities::PRE_VALIDATE],
        ];
    }

    public function checkPasswordReset(ViewEvent $event)
    {
        $request = $event->getRequest();
        if ('api_reset_password_code_validations_post_collection' !== $request->attributes->get('_route')) {
            return;
        }
         $codePasswordRequest = $event->getControllerResult();
        
         $user = $this->userRepo->findOneByResetPasswordCode(
         	(string)$codePasswordRequest->resetPasswordCode);

         if ($user) {
             $userNormaliser = $this->normalizer->normalize($user, null, ['groups'=>'user:read']);
            $data = json_encode($userNormaliser);
                 $event->setResponse(new JsonResponse($data, 200, [], true), 200);           
           }else{
                 $event->setResponse(new JsonResponse([
                    "status"=>400,
                    "message"=>"le code est incorrect !"
                ], 200));           

           }
    }
}
