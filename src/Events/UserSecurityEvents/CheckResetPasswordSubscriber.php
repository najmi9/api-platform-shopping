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
use ApiPlatform\Core\Validator\ValidatorInterface;




final class CheckResetPasswordSubscriber implements EventSubscriberInterface
{
    private $encoder, $em, $userRepo;
     private $validator;

    public function __construct(UserPasswordEncoderInterface $encoder, EntityManagerInterface $em, UserRepository $userRepo, NormalizerInterface $normalizer, ValidatorInterface $validator)
    {
        $this->encoder = $encoder;
        $this->em = $em;
        $this->userRepo = $userRepo;
        $this->normalizer = $normalizer;
         $this->validator = $validator;
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
          $this->validator->validate($codePasswordRequest);
         $user = $this->userRepo->findOneByResetPasswordCode(
         	(string)$codePasswordRequest->getResetPasswordCode());
         if ($user) {
             $userNormaliser = $this->normalizer->normalize($user, null, ['groups'=>'user:read']);
            $data = json_encode($userNormaliser);
                 $event->setResponse(new JsonResponse($data, 200, [], true), 200);           
           }else{
                 $event->setResponse(new JsonResponse([
                    "status"=>400,
                    "message"=>"le code est incorrect !"
                ], 400));           

           }
    }
}
